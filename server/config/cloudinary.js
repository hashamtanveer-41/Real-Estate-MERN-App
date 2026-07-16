import cloudinary from 'cloudinary';
import multer from 'multer';
import dotenv from "dotenv";

dotenv.config();
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Configure Multer storage in memory (we upload to memory first, then stream to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export { cloudinary, upload };