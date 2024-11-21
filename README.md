# URL Shortener Service (AWS Lambda + API Gateway)

This project provides a URL shortener service using AWS Lambda functions and API Gateway. It consists of two Lambda functions: one for shortening URLs and another for redirecting users from shortened URLs to the original URLs. The service uses an S3 bucket to store the mapping between shortened URLs and original URLs (I know that this is not the best way to store this information, but it is a simple way to demonstrate how to use S3 with Lambda functions).

## Project Structure

## Components

### 1. URL Shortener Lambda

This Lambda function is responsible for generating a shortened URL and storing the original URL in an S3 bucket.

- **Name**: `url-shorter`
- **Description**: A Lambda function to shorten a URL and store the original URL in S3.
- **Dependencies**:
  - `aws-sdk`: AWS SDK for JavaScript
  - `dotenv`: Module to load environment variables from a `.env` file
  - `uuid`: Library to generate unique identifiers

#### Configuration

The Lambda function uses the following environment variables, which should be defined in a `.env` file:

```env
BUCKET_NAME=my-s3-bucket-name
GATEWAY_URL=https://your-api-id.execute-api.your-region.amazonaws.com/your-stage
```

### 2. URL Redirect Lambda

This Lambda function is responsible for redirecting users from the shortened URL to the original URL by looking up the mapping stored in the S3 bucket.

- **Name**: `url-redirect`
- **Description**: A Lambda function to get the original URL from a shortened URL and redirect to it.
- **Dependencies**:
  - `aws-sdk`: AWS SDK for JavaScript
  - `dotenv`: Module to load environment variables from a `.env` file

#### Configuration

The Lambda function uses the following environment variables, which should be defined in a `.env` file:

```env
BUCKET_NAME=my-s3-bucket-name
```

## Usage

1. Deploy the Lambda functions using your preferred deployment method (e.g., AWS SAM, Serverless Framework, or manually via the AWS Console).
2. Configure the API Gateway to route requests to the appropriate Lambda functions.
3. Define the environment variables in the `.env` files for each Lambda function.
4. Test the URL shortener service by sending HTTP requests to the API Gateway endpoints.

## Example Requests

### Shorten a URL

`POST gateway-url/create`

```json
{
  "url": "https://www.example.com"
}
```

### Redirect to Original URL

`GET gateway-url/{shortened-code}`

Replace `{shortened-code}` with the code returned from the URL shortener Lambda function.
