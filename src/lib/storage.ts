import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Lazy initialization of Supabase client
let supabaseClientInstance: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase environment variables are not configured (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).');
  }
  if (!supabaseClientInstance) {
    supabaseClientInstance = createClient(supabaseUrl, supabaseServiceKey);
  }
  return supabaseClientInstance;
}

// Default to 'rotaract-assets' matching the existing bucket config
const BUCKET = process.env.SUPABASE_BUCKET || 'rotaract-assets';

// Ensure the bucket exists (called lazily on first upload)
let bucketInitialized = false;
async function ensureBucketExists() {
  if (bucketInitialized) return;

  try {
    const supabase = getSupabase();
    // Attempt to create the bucket in case it doesn't exist
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 10485760, // 10MB limit
    });
    
    // Ignore the error if the bucket already exists
    if (error && error.message !== 'Bucket already exists' && !error.message.includes('already exists')) {
      console.warn('⚠️ Non-critical warning creating Supabase Storage bucket:', error.message);
    }
    bucketInitialized = true;
  } catch (err) {
    console.warn('⚠️ Failed checking/creating Supabase Storage bucket:', err);
  }
}

export async function uploadFile(key: string, body: Buffer | Uint8Array, contentType: string): Promise<string> {
  try {
    const supabase = getSupabase();
    await ensureBucketExists();

    console.log(`📤 Uploading file ${key} to Supabase Storage bucket "${BUCKET}"...`);
    const { data, error } = await supabase.storage.from(BUCKET).upload(key, body, {
      contentType,
      upsert: true,
    });

    if (error) throw error;

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(key);
    console.log(`✅ Uploaded successfully. Public URL: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error('❌ Supabase storage upload failed, saving locally as fallback:', error);
    try {
      const fs = await import('fs');
      const path = await import('path');
      const localPath = path.join(process.cwd(), 'public', 'uploads', key);
      const dir = path.dirname(localPath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(localPath, Buffer.from(body));
      console.log(`✅ Saved fallback file locally at: /uploads/${key}`);
      return `/uploads/${key}`;
    } catch (localErr) {
      console.error('❌ Failed to write local fallback file:', localErr);
      return `/uploads/mock-${key}`;
    }
  }
}

export async function deleteFile(key: string) {
  try {
    const supabase = getSupabase();
    await ensureBucketExists();

    console.log(`🗑️ Deleting file ${key} from Supabase Storage bucket "${BUCKET}"...`);
    const { error } = await supabase.storage.from(BUCKET).remove([key]);
    if (error) throw error;
    console.log(`✅ File ${key} deleted successfully.`);
  } catch (error) {
    console.warn('⚠️ Supabase storage delete failed, trying to delete local fallback:', error);
    try {
      const fs = await import('fs');
      const path = await import('path');
      const localPath = path.join(process.cwd(), 'public', 'uploads', key);
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
        console.log(`✅ Deleted local fallback file: ${localPath}`);
      }
    } catch (localErr) {
      console.error('❌ Failed to delete local fallback file:', localErr);
    }
  }
}
