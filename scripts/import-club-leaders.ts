/**
 * Parse all Zone HTML files and extract club leader data,
 * then update the clubs table via SQL.
 * Run: npx tsx scripts/import-club-leaders.ts
 */
import 'dotenv/config';
import postgres from 'postgres';
import * as fs from 'fs';
import * as path from 'path';

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

interface Leader {
  name: string;
  designation: string;
  phone: string;
  email: string;
}

interface ClubData {
  clubName: string;
  clubType: string;
  clubEmail: string;
  partnerClub: string;
  zone: string;
  leaders: Leader[];
}

function stripHtml(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractZoneName(html: string): string {
  const match = html.match(/ZONE\s+([A-Z]+)/i);
  return match ? match[1] : 'UNKNOWN';
}

/**
 * Parse the HTML table from a zone file.
 * The table columns are: Sl.No | Club Name | Club Type | Club Email | Partner | Name | Designation | Phone | Email
 */
function parseZoneHtml(html: string, zoneName: string): ClubData[] {
  const clubs: ClubData[] = [];

  // Extract all <tr> rows
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;

  const rows: string[][] = [];
  let rowMatch;

  while ((rowMatch = rowRegex.exec(html)) !== null) {
    const rowHtml = rowMatch[1];
    const cells: string[] = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
      cells.push(stripHtml(cellMatch[1]));
    }
    if (cells.length >= 4) {
      rows.push(cells);
    }
  }

  // Skip header rows (first 3 rows are: blank, zone header, column headers)
  // Each data row after that has: [A=blank, B=slNo, C=clubName, D=clubType, E=clubEmail, F=partner, G=name, H=designation, I=phone, J=personEmail]
  // Because of rowspan merging in HTML, we need to track "current club" context

  let currentClub: ClubData | null = null;
  let currentSlNo = '';

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // Skip if all cells empty
    if (row.every(c => !c.trim())) continue;

    // Find the index offset — rows may have 1 blank leading cell or 2
    // Typically: row[0] = '' (A), row[1] = slNo/blank, row[2] = clubName/blank, ...

    // If row[1] is a number, this is a "first row" for a club
    const slNo = row[1]?.trim();
    const isNewClub = /^\d+$/.test(slNo) && slNo !== currentSlNo;

    if (isNewClub) {
      if (currentClub) clubs.push(currentClub);
      currentSlNo = slNo;

      const clubName = row[2]?.trim() || '';
      const clubType = row[3]?.trim() || '';
      const clubEmail = row[4]?.trim() || '';
      const partnerClub = row[5]?.trim() || '';
      const leaderName = row[6]?.trim() || '';
      const designation = row[7]?.trim() || '';
      const phone = row[8]?.trim() || '';
      const personEmail = row[9]?.trim() || '';

      currentClub = {
        clubName,
        clubType,
        clubEmail,
        partnerClub,
        zone: 'Zone ' + zoneName,
        leaders: [],
      };

      if (leaderName) {
        currentClub.leaders.push({ name: leaderName, designation, phone, email: personEmail });
      }
    } else if (currentClub) {
      // Continuation row for same club — just leader details
      // For rowspan rows: row[1] might be blank, row[2..5] blank, row[6] = name
      const leaderName = row[6]?.trim() || row[2]?.trim() || '';
      const designation = row[7]?.trim() || row[3]?.trim() || '';
      const phone = row[8]?.trim() || row[4]?.trim() || '';
      const personEmail = row[9]?.trim() || row[5]?.trim() || '';

      if (leaderName && designation) {
        currentClub.leaders.push({ name: leaderName, designation, phone, email: personEmail });
      }
    }
  }

  if (currentClub) clubs.push(currentClub);

  // Filter out header/footer noise
  return clubs.filter(c => c.clubName && !c.clubName.toLowerCase().includes('club name'));
}

function findLeader(leaders: Leader[], role: string): Leader | undefined {
  const roleLower = role.toLowerCase();
  return leaders.find(l => l.designation.toLowerCase().includes(roleLower));
}

function cleanName(name: string): string {
  // Remove "Rtr. " prefix, "IPP ", "PP " etc
  return name
    .replace(/^(Rtr\.|Rtr|IPP Rtr\.|PP Rtr\.|Rtn\.)\s*/i, '')
    .trim();
}

async function run() {
  const zoneDir = path.join(process.cwd(), '.tmp', 'club-leaders');
  const files = fs.readdirSync(zoneDir).filter(f => f.startsWith('Zone ') && f.endsWith('.html'));

  const allClubs: ClubData[] = [];

  for (const file of files) {
    const html = fs.readFileSync(path.join(zoneDir, file), 'utf-8');
    const zoneName = extractZoneName(html);
    const clubs = parseZoneHtml(html, zoneName);
    console.log(`Zone ${zoneName}: parsed ${clubs.length} clubs`);
    allClubs.push(...clubs);
  }

  console.log(`\nTotal clubs parsed: ${allClubs.length}`);

  // Fetch all existing clubs from DB
  const dbClubs = await sql`SELECT id, name, slug, zone, president_name, president_email, president_phone, secretary_name, secretary_email, secretary_phone FROM clubs`;

  console.log(`DB clubs: ${dbClubs.length}`);

  let updated = 0;
  let skipped = 0;
  const unmatched: string[] = [];

  for (const club of allClubs) {
    // Try to match by name similarity
    const cleanSource = club.clubName.toLowerCase().replace(/[^a-z0-9]/g, '');

    let match = dbClubs.find(db => {
      const cleanDb = db.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanDb === cleanSource ||
        cleanDb.includes(cleanSource.substring(0, 20)) ||
        cleanSource.includes(cleanDb.substring(0, 20));
    });

    const president = findLeader(club.leaders, 'president');
    const secretary = findLeader(club.leaders, 'secretary');

    if (!match) {
      // Try partial word match
      const words = club.clubName.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      match = dbClubs.find(db => {
        const dbLower = db.name.toLowerCase();
        return words.filter(w => dbLower.includes(w)).length >= Math.min(3, words.length);
      });
    }

    if (!match) {
      unmatched.push(club.clubName);
      skipped++;
      continue;
    }

    // Build update
    const updates: Record<string, string | null> = {
      zone: club.zone,
    };

    if (president) {
      updates.president_name = cleanName(president.name);
      if (president.email) updates.president_email = president.email;
      if (president.phone) updates.president_phone = president.phone;
    }

    if (secretary) {
      updates.secretary_name = cleanName(secretary.name);
      if (secretary.email) updates.secretary_email = secretary.email;
      if (secretary.phone) updates.secretary_phone = secretary.phone;
    }

    if (club.clubEmail && !match.clubEmail) {
      updates.club_email = club.clubEmail;
    }

    // Run update
    try {
      await sql`
        UPDATE clubs SET
          zone = ${updates.zone},
          president_name = COALESCE(NULLIF(${updates.president_name ?? ''}, ''), president_name),
          president_email = COALESCE(NULLIF(${updates.president_email ?? ''}, ''), president_email),
          president_phone = COALESCE(NULLIF(${updates.president_phone ?? ''}, ''), president_phone),
          secretary_name = COALESCE(NULLIF(${updates.secretary_name ?? ''}, ''), secretary_name),
          secretary_email = COALESCE(NULLIF(${updates.secretary_email ?? ''}, ''), secretary_email),
          secretary_phone = COALESCE(NULLIF(${updates.secretary_phone ?? ''}, ''), secretary_phone)
        WHERE id = ${match.id}
      `;
      console.log(`  ✓ Updated: ${match.name} → Zone: ${club.zone}, President: ${president?.name ?? '—'}, Secretary: ${secretary?.name ?? '—'}`);
      updated++;
    } catch (err) {
      console.error(`  ✗ Failed for ${match.name}:`, err);
    }
  }

  console.log(`\n✅ Done: ${updated} clubs updated, ${skipped} unmatched.`);

  if (unmatched.length > 0) {
    console.log('\n⚠ Unmatched clubs (not in DB):');
    unmatched.forEach(n => console.log('  -', n));
  }

  await sql.end();
}

run().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
