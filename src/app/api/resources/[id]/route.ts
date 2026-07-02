import { getDb } from '@/lib/db';
import { coldStorageFiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const file = await db.query.coldStorageFiles.findFirst({
      where: eq(coldStorageFiles.id, id),
    });

    if (!file) {
      return new NextResponse('Resource not found', { status: 404 });
    }

    // If key is a direct URL, redirect directly
    if (file.r2Key.startsWith('http://') || file.r2Key.startsWith('https://')) {
      return NextResponse.redirect(file.r2Key);
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const bucketName = process.env.SUPABASE_BUCKET || 'rotaract-assets';

    if (!supabaseUrl) {
      return new NextResponse('Storage service unconfigured', { status: 500 });
    }

    // Build the Supabase Storage public URL
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${file.r2Key}`;
    return NextResponse.redirect(publicUrl);
  } catch (error) {
    console.error('Error fetching resource:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
