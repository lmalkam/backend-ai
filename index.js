import { OpenAI } from "openai";
import 'dotenv/config'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your actual API key
});

async function fetchData(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `For the below given syllabus give me a school like test paper for exam .
    -it should contain 10 questions
    - all the questions should be of descriptive type
    - questions should have variation in marks 
    
    ${prompt}` }],
    model: "gpt-3.5-turbo",
  });

  const res = completion.choices[0].message.content;
  return res;
}

export default fetchData;

fetchData()
