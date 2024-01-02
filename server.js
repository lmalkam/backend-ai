// index.js
import express from 'express'
import fetchData from './index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;
import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.8k8x2n0.mongodb.net/posts'
);

app.use(cors());
app.use(bodyParser.json())


const Post = mongoose.model("Post",{
  type: String,
  syllabus: String,
  response: String
});


// Define a route
app.post('/test', async (req, res) => {

  const query = req.body.syllabus;
  try {

    const data = await fetchData(query, "test");
    if(data)
    {
      const NewPost = new Post({
        type:'test',
        syllabus: query,
        response: data
      });

      NewPost.save().then( doc =>
        {
          res.json({ data });
        })
    }
    
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json("Internal Server Error");
  }
});


app.post('/notes', async (req, res) => {

  const query = req.body.syllabus;
  try {
    const data = await fetchData(query, "notes");
    if(data)
    {
      const NewPost = new Post({
        type:'notes',
        syllabus: query,
        response: data
      });

      NewPost.save().then(doc =>
        {
          res.json({ data });
        })
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json("Internal Server Error");
  }
});

app.get('/history', async (req, res) => {
  try {
    // Fetch posts from the database for the specified user_id
    const posts = await Post.find({});

    // Send the retrieved posts as a response
    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});



