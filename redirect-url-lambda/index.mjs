import AWS from "aws-sdk";
const s3 = new AWS.S3();
import { config } from "dotenv";

config(); // Load the environment variables

export const handler = async (event, context) => {
  const { rawPath } = event;
  const pathSegments = rawPath.split("/");
  const code = pathSegments[pathSegments.length - 1];

  const bucketName = process.env.BUCKET_NAME;
  if (!bucketName)
    throw new Error("Bucket name is not defined in the .env file");

  const params = {
    Bucket: bucketName,
    Key: `${code}.json`,
  };

  try {
    const data = await s3.getObject(params).promise();
    const { url, expiresIn } = JSON.parse(data.Body.toString("utf-8"));

    return {
      statusCode: 301,
      headers: {
        Location: url,
      },
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error),
    };
  }
};
