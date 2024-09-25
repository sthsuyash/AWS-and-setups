import AWS from 'aws-sdk';
import axios from 'axios';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const s3 = new AWS.S3();

async function saveJsonToS3() {
    try {
        const startDate = "2023-01-08";
        const endDate = "2023-01-09";
        const api = `${process.env.NASA_API_URL}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NASA_API_KEY}`;

        const response = await axios.get(api);
        const data = response.data;

        // Get the current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(now.getDate()).padStart(2, '0');

        const s3Path = `year=${year}/month=${month}/day=${day}/${uuidv4()}.json`;

        const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: s3Path,
            Body: JSON.stringify(data),
            ContentType: 'application/json',
        };

        await s3.putObject(uploadParams).promise();

        console.log(`File saved to S3 at ${s3Path}`);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `File saved to S3 at ${s3Path}` }),
        };
    } catch (error) {
        console.error('Error saving JSON to S3:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error saving JSON to S3', error: error.message }),
        };
    }
}

export const handler = async () => {
    return await saveJsonToS3();
};
