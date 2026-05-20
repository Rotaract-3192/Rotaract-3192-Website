// 2-bit permission bitmask
// Binary 01 = 1 = Master Admin      → /admin access
// Binary 10 = 2 = Assigned Admin    → /club-admin access only
// Binary 11 = 3 = Club President    → /club-admin access, flagged as president

export const PERM_MASTER_ADMIN = 1; // bit 0
export const PERM_CLUB_PANEL   = 2; // bit 1

export function isMasterAdmin(bits: number): boolean {
  return (bits & PERM_MASTER_ADMIN) === PERM_MASTER_ADMIN;
}

export function hasClubPanel(bits: number): boolean {
  return (bits & PERM_CLUB_PANEL) === PERM_CLUB_PANEL;
}

export function isClubPresident(bits: number): boolean {
  return bits === 3; // 11 binary — has club panel bit AND president bit
}

export function isAssignedAdmin(bits: number): boolean {
  return bits === 2; // 10 binary — club panel only
}

export function getRoleLabel(bits: number): string {
  switch (bits) {
    case 1: return 'Master Admin';
    case 2: return 'Assigned Admin';
    case 3: return 'Club President';
    default: return 'Member';
  }
}

export function getBinaryStr(bits: number): string {
  return bits.toString(2).padStart(2, '0');
}

export function getRoleBadgeClass(bits: number): string {
  switch (bits) {
    case 1: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 2: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 3: return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    default: return 'bg-white/5 text-white/30 border-white/10';
  }
}
