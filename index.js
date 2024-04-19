import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
import { urlencoded } from 'express';
import router from './user/router.js';
import connectMongo from './config/connectiondb.js';
import { fileURLToPath } from 'url';
import path from 'path'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, './client/dist');
console.log(clientPath);
app.use('/', express.static(clientPath))

const port = process.env.PORT || 3000 

// Middleware
app.use(express.json())
app.use(urlencoded({ extended: false }));
app.use(cors(
  {
      origin: "http://localhost:5173",
      credentials: "true"
  }
))

// Routes
app.use('/api/user', router);


// Connect to MongoDB
const databaseName = process.env.DB_NAME;
const URL = process.env.URL ;
connectMongo(URL, databaseName);


// Default route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./client/dist/index.html'))
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});