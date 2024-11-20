import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
const s3 = new AWS.S3();
import { config } from "dotenv";
config(); // Load the environment variables

export const handler = async (event, context) => {
  const bucketName = process.env.BUCKET_NAME;
  if (!bucketName)
    throw new Error("Bucket name is not defined in the .env file");

  const { url, expiresIn } = JSON.parse(event.body || "{}");

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "URL is required",
      }),
    };
  }

  const uuid = uuidv4();
  const code = uuid.substring(0, 8);
  const fileContent = JSON.stringify({
    url,
    expiresIn,
  });

  // S3 upload parameters
  const params = {
    Bucket: bucketName,
    Key: `${code}.json`, // file name
    Body: fileContent,
    ContentType: "application/json",
  };

  try {
    // Upload the file to S3
    await s3.putObject(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "File uploaded successfully",
        code,
        url,
        expiresIn,
      }),
    };
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error uploading file to S3",
        error: error.message,
      }),
    };
  }
};
