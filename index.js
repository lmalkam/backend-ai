import { OpenAI } from "openai";
import 'dotenv/config'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

async function fetchData(prompt, mode) {
  const prompts = {
    test : `For the below given syllabus give me a school like test paper for exam .
    -it should contain 10 questions with answers
    -all the questions should be of descriptive type 
    -questions should have variation in marks 
    -only use commonmark markdown for response, use #, ##, ### for headings
    -do not provide any instructions
    
    `, 

    notes : `For the below given syllabus make short note on every topic.
    -every topic should be covered
    -it should make topic memorable
    -only use commonmark markdown for response, use #, ##, ### for headings
    - inlcude few resources links with each topic in format like '[link text](url) or <http://example.com/>'(only use wikipedia links)
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


