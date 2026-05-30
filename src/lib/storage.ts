import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// Lazy initialization of S3 client — evaluated at call time, not module load time
let s3ClientInstance: S3Client | null = null;

function getS3Client() {
  const endpoint = process.env.S3_ENDPOINT;
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('S3 environment variables are not configured (S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY).');
  }

  if (!s3ClientInstance) {
    s3ClientInstance = new S3Client({
      region: process.env.S3_REGION || 'auto',
      endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  return s3ClientInstance;
}

const BUCKET = process.env.S3_BUCKET || 'rotaract-assets';

export async function uploadFile(key: string, body: Buffer | Uint8Array, contentType: string): Promise<string> {
  try {
    const s3 = getS3Client();
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    }));
    const publicUrl = (process.env.S3_PUBLIC_URL || '').replace(/\/$/, '');
    return `${publicUrl}/${key}`;
  } catch (error) {
    console.error('S3 upload failed:', error);
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
    console.warn('S3 delete failed or credentials missing:', error);
  }
}
