import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const sampleImageAddress = "https://i.stack.imgur.com/ts0du.jpg"

async function main() {
	const response = await openai.chat.completions.create({
		model: "gpt-4-vision-preview",
		messages: [
			{
				role: "user",
				content: [
					{ type: "text", text: "Recreate table in the image." },
					{
						type: "image_url",
						image_url: {
							"url": sampleImageAddress,
						},
					},
				],
			},
		],
		max_tokens: 1024,
	});
	console.log(response.choices[0]);
}
main();