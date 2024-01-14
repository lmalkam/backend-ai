// index.js
import express from 'express';
import fetchData from './index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)

app.use(cors());
app.use(bodyParser.json());

const User = mongoose.model("User", {
  user_id: String,
  available_tokens: Number
});

const Post = mongoose.model("Post", {
  type: String,
  syllabus: String,
  response: String,
  user_id: String
});

// Define a route
app.post('/test', async (req, res) => {
  const { syllabus, user_id } = req.body;

  try {
    let user = await User.findOne({ user_id });

    if (!user) {
      // Create a new user with 29 tokens if not exists
      user = new User({
        user_id,
        available_tokens: 29
      });
      await user.save();
    }

    if (user.available_tokens > 0) {
      const data = await fetchData(syllabus, "test");

      if (data) {
        const NewPost = new Post({
          type: 'test',
          syllabus,
          response: data,
          user_id
        });

        user.available_tokens--;
        await user.save();

        await NewPost.save();

        res.json({ data });
      }
    } else {
      res.status(403).json({ error: 'Not enough tokens' });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/ans', async (req, res) => {
  const { syllabus, user_id } = req.body;

  try {
    let user = await User.findOne({ user_id });

    if (!user) {
      // Create a new user with 29 tokens if not exists
      user = new User({
        user_id,
        available_tokens: 29
      });
      await user.save();
    }

    if (user.available_tokens > 0) {
      const data = await fetchData(syllabus, "ans");

      if (data) {
        const NewPost = new Post({
          type: 'ans',
          syllabus,
          response: data,
          user_id
        });

        user.available_tokens--;
        await user.save();

        await NewPost.save();

        res.json({ data });
      }
    } else {
      res.status(403).json({ error: 'Not enough tokens' });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/analyse', async (req, res) => {
  const { syllabus, user_id } = req.body;

  try {
    let user = await User.findOne({ user_id });

    if (!user) {
      // Create a new user with 29 tokens if not exists
      user = new User({
        user_id,
        available_tokens: 29
      });
      await user.save();
    }

    if (user.available_tokens > 0) {
      const data = await fetchData(syllabus, "analyse");

      if (data) {
        const NewPost = new Post({
          type: 'Analysis',
          syllabus,
          response: data,
          user_id
        });

        user.available_tokens--;
        await user.save();

        await NewPost.save();

        res.json({ data });
      }
    } else {
      res.status(403).json({ error: 'Not enough tokens' });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/notes', async (req, res) => {
  const { syllabus, user_id } = req.body;

  try {
    let user = await User.findOne({ user_id });

    if (!user) {
      // Create a new user with 29 tokens if not exists
      user = new User({
        user_id,
        available_tokens: 29
      });
      await user.save();
    }

    if (user.available_tokens > 0) {
      const data = await fetchData(syllabus, "notes");

      if (data) {
        const NewPost = new Post({
          type: 'notes',
          syllabus,
          response: data,
          user_id
        });

        user.available_tokens--;
        await user.save();

        await NewPost.save();

        res.json({ data });
      }
    } else {
      res.status(403).json({ error: 'Not enough tokens' });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/history', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id in the query parameters' });
  }

  try {
    const posts = await Post.find({ user_id }).sort({ _id: -1 });
    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/user', async (req, res) => {
  const { user_id } = req.query;

  try {
    const user = await User.findOne({ user_id });

    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
