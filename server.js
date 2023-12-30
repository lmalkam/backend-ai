// index.js
import express from 'express'
import fetchData from './index.js';

const app = express();
const port = 3000;

// Define a route
app.get('/test', async (req, res) => {
    try {
      const data = await fetchData("Introduction, Web and HTTP, Web Caching, DNS, Email: SMTP, MIME,POP3, Webmail, FTP, TELNET");
      res.send(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});



