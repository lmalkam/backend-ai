import { OpenAI } from "openai";
import 'dotenv/config'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

async function fetchData(prompt, mode) {
  const prompts = {
    test : `For the below given syllabus give me a school like test paper for exam .
    -it should contain 10 questions
    -all the questions should be of descriptive type
    -questions should have variation in marks 
    -respond in html with body component only with tailwind styles only(do not give anything else)
    `, 

    notes : `For the below given syllabus make cheatsheet on every topic.
    -every topic should be covered
    -it should make topic memorable
    -respond in html with body component only with tailwind styles only(do not give anything else)
    `
    
  }
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: ` ${prompts[mode]}
    
    ${prompt}` }],
    model: "gpt-3.5-turbo",
    max_tokens: 1500,
  });

  const res = completion.choices[0].message.content;
  return res;
}

export default fetchData;


