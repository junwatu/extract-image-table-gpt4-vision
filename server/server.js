import express from 'express';
import OpenAI from 'openai';
import 'dotenv/config';

const app = express();
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

app.get('/', (req, res) => {
	const jsonData = {
		urls: {
			home: '/',
			processImage: '/process-image'
		},
	}
	res.json(jsonData);
});

app.post('/process-image', async (req, res) => {
	try {
		const imageUrl = req.body.imageData;
		const result = await processImageRequest(imageData);
		res.json(result);
	} catch (error) {
		res.status(500).send('Error processing image request');
	}
});

const PORT = process.env.PORT || 5115;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
