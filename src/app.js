import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import passport from "../src/config/passport.js"
import session from 'express-session';


dotenv.config(); 
 
const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret : process.env.SESSION_TOP_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use('/', postRoutes);

console.log('__dirname:', __dirname);
console.log('Views path:', path.join(__dirname, 'views'));


console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
