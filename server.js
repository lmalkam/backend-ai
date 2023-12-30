// index.js
import express from 'express'
import fetchData from './index.js';
import bodyParser from 'body-parser';
import cors from 'cors'; 
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json())

// Define a route
app.post('/test', async (req, res) => {

  const query = req.body.syllabus;
    try {

      const data = await fetchData(query, "test");
      res.json({data});
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json("Internal Server Error");
    }
  });

  app.post('/notes', async (req, res) => {

    const query = req.body.syllabus;
      try {
        const data = await fetchData(query, "notes");
        res.json({data});
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json("Internal Server Error");
      }
    });




// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});



