import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function generateUploadUrl(user) {
  if (!user) throw new Error("Not authorized");

  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: new Date(Date.now() + 60 * 1000),
  };

  const uploadURL = await getSignedUrl(s3, new PutObjectCommand(params));
  return uploadURL;
}
