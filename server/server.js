import 'dotenv/config';
import OpenAI from 'openai';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import express, { response } from 'express';
import { saveData, getAllData, getDatabyID, info } from './griddbservices.js';

const PORT = process.env.PORT || 5115;
const HOST = process.env.HOST || "localhost";
const app = express();

app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: function(req, file, cb) {
        // Create a file name with the original extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function processImageRequest(filePath) {
    const imageBuffer = await fs.readFile(filePath);
    const base64Image = imageBuffer.toString('base64');
    const encodedImage = `data:image/jpeg;base64,{${base64Image}}`;

    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Recreate table in the image." },
                    { type: "image_url", image_url: { "url": encodedImage } },
                ],
            },
        ],
        max_tokens: 1024,
    });
    return response;
}

app.post('/process-image', upload.single('image'), async (req, res) => {
    try {
        const result = await processImageRequest(req.file.path);
        console.log(result)
        if (result.choices[0].finish_reason === 'stop') {
            res.json({ result: result.choices[0], status: true });
        } else {
            res.json({ result, status: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error processing image request');
    }
});

app.get('/info', async (req, res) => {
    try {
        const result = await info();
        res.json(result);
    } catch (error) {
        res.status(500).send('Error getting container info');
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}`);
});
