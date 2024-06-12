import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use('/', postRoutes);

console.log('__dirname:', __dirname);
console.log('Views path:', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
