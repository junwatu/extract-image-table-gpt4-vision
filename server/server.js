import express from 'express';
import OpenAI from 'openai';
import 'dotenv/config';
import { saveData, getAllData, getDatabyID, info } from './griddbservices.js';

const PORT = process.env.PORT || 5115;
const HOST = process.env.HOST || "localhost";

const app = express();
app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

async function processImageRequest(imageUrl) {
	const response = await openai.chat.completions.create({
		model: "gpt-4-vision-preview",
		messages: [
			{
				role: "user",
				content: [
					{ type: "text", text: "Recreate table in the image." },
					{ type: "image_url", image_url: { "url": imageUrl } },
				],
			},
		],
		max_tokens: 1024,
	});
	return response.choices[0];
}

app.post('/process-image', async (req, res) => {
	try {
		const imageUrl = req.body.imageData;
		//const result = await processImageRequest(imageData);
		console.log("from the server:\n");
		res.json({result: imageUrl});
	} catch (error) {
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
})

app.listen(PORT, HOST, () => {
	console.log(`Server is running on port ${PORT}`);
});
