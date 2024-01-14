import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config'



async function fetchData(prompt, mode) {
  const prompts = {
    test : `For the below given syllabus give me a school like test paper for exam .
    -it should contain 10 questions with a very short answer key
    -all the questions should be of descriptive type 
    -questions should have variation in marks 
    -only use commonmark markdown for response, use #, ##, ### for headings
    -do not provide any instructions
    
    `, 

    notes : `For the below given syllabus give me notes on every topic.
    -every topic should be covered in at least 150  words, could be more depending on the topic
    -only use commonmark markdown for response, use #, ##, ### for headings
    - inlcude few resources links with each topic 
    `,

    ans: `Answer the below question as an ideal answer to a question in a test that will get full marks
    -only use commonmark markdown for response, use #, ##, ### for headings
    `
    

  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const gen_prompt = `${prompts[mode]}
  ${prompt}
  `

  const result = await model.generateContent(gen_prompt);
  const response = await result.response;
  const text = response.text();

  const res = text;
  return res;
}

export default fetchData;


