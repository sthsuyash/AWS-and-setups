import AWS from "aws-sdk";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.SESSION_TOKEN,
    region: process.env.AWS_REGION,
});

async function fetchDataAndUploadToS3() {
    try {
        const s3 = new AWS.S3();
        const startDate = "2016-01-01";
        const endDate = "2016-01-30";
        const api = process.env.NASA_API_URL + `?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_API_KEY}`;
        const response = await axios.get(api);

        const data = JSON.stringify(response.data);

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `api-data-${Date.now()}.json`,
            Body: data,
            ContentType: "application/json",
        };

        s3.upload(params, (err, result) => {
            if (err) {
                console.error("Error uploading to S3:", err);
            } else {
                console.log("File successfully uploaded to S3 at:", result.Location);
            }
        });
    } catch (error) {
        console.error("Error fetching data from API:", error);
    }
}

fetchDataAndUploadToS3();
