const AWS = require("aws-sdk");

const s3 = new AWS.S3({ signatureVersion: "v4" });

const BUCKET_NAME = process.env.BUCKET_NAME;

exports.handler = async (event) => {
  console.log("Event dump:", JSON.stringify(event));

  const objectKey = event.queryStringParameters.key;
  if (!objectKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No object key was included in the request parameters!",
      }),
    };
  }

  const signedUrl = await s3.getSignedUrlPromise("putObject", {
    Bucket: BUCKET_NAME,
    Key: objectKey,
  });
  console.log("Signed URL:", signedUrl);

  return {
    statusCode: 200,
    body: JSON.stringify({
      signedUrl,
    }),
  };
};
