import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// Lazy initialization of S3 client — evaluated at call time, not module load time
let s3ClientInstance: S3Client | null = null;

function getS3Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 environment variables are not configured (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY).');
  }

  if (!s3ClientInstance) {
    s3ClientInstance = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      // Cloudflare R2 requires path-style URLs — virtual-hosted-style will fail
      forcePathStyle: true,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  return s3ClientInstance;
}

const BUCKET = 'rotaract-assets';

export async function uploadFile(key: string, body: Buffer | Uint8Array, contentType: string): Promise<string> {
  try {
    const s3 = getS3Client();
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    }));
    const publicUrl = (process.env.R2_PUBLIC_URL || '').replace(/\/$/, '');
    return `${publicUrl}/${key}`;
  } catch (error) {
    console.error('❌ R2 upload failed:', error);
    // Return a placeholder — caller can decide how to handle
    return `/uploads/mock-${key}`;
  }
}

export async function deleteFile(key: string) {
  try {
    const s3 = getS3Client();
    await s3.send(new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }));
  } catch (error) {
    console.warn('⚠️ R2 delete failed or credentials missing:', error);
  }
}

