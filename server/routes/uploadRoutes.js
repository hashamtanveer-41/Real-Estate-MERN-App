import express from "express";

const router = express.Router();
import multer from "multer";
import { cloudinary, upload } from "../config/cloudinary.js";

// Upload route

router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Convert buffer to base64 to send to Cloudinary
        const fileBase64 = req.file.buffer.toString('base64');
        const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(fileUri, {
            folder: 'mern_uploads', // Optional: creates a folder in your Cloudinary media library
        });

        // Here, you would typically save 'result.secure_url' to MongoDB
        // Example: const newUserImage = await User.findByIdAndUpdate(req.user.id, { profilePic: result.secure_url })

        res.status(200).json({
            message: 'Upload successful',
            url: result.secure_url, // This is the URL you save to MongoDB
            public_id: result.public_id, // Save this if you plan to delete/update the image later
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server upload error', error: error.message });
    }
});

export default router;