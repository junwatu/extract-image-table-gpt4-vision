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

/**----Prompts----*/
const cleanupPrompt = `I need you to extract the table data from this message and provide the answer in markdown format. Answer only the markdown table data, nothing else. do not use code blocks. \n\n`;
const tablePrompt = "Recreate table in the image.";


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
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
                    { type: "text", text: tablePrompt },
                    { type: "image_url", image_url: { "url": encodedImage } },
                ],
            },
        ],
        max_tokens: 1024,
    });
    return response;
}


async function cleanupData(data) {
    const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [
            {
                "role": "system",
                "content": "you are a smart table data extractor"
            },
            {
                "role": "user",
                "content": `${cleanupPrompt} \n\n${data}`
            }
        ],
        temperature: 1,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return response;
}

app.post('/process-image', upload.single('image'), async (req, res) => {
    try {
        const result = await processImageRequest(req.file.path);
        console.log(result)
        if (result.choices[0].finish_reason === 'stop') {
            const cleanedData = await cleanupData(result.choices[0].message.content);
            res.json({ result: cleanedData, status: true });
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
