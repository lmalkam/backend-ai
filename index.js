import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config'



async function fetchData(prompt, mode) {
  const prompts = {
    test : `For the below given syllabus give me a test.
    -it should contain 10 questions with a very short answer key after each question
    -all the questions should be of descriptive type 
    -test should contain questions of 4,5,6,7,8 marks
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
    `,

    analyse: `Analyse the syllabus given below and provide the list of most important topics along with subtopic that I need to study inorder to ace the exams`
    

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


