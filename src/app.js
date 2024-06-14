import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement dès le début

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url); // Convertir l'URL en chemin de fichier
const __dirname = path.dirname(__filename); // Obtenir le nom du répertoire

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Corriger le chemin du répertoire des vues

app.use('/', postRoutes);

console.log('__dirname:', __dirname);
console.log('Views path:', path.join(__dirname, 'views'));

// Vérifiez que les variables d'environnement sont chargées
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
