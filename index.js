import { OpenAI } from "openai";
import 'dotenv/config'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your actual API key
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "what is react js " }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);
}

main();
