import bcrypt from "bcrypt";
import { addUser, findUserByEmail } from '../models/postModels.js';

const saltRounds = process.env.DB_SALT;

export const connexionUserController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userExist = await findUserByEmail(email);
    if (!userExist) {
      res.redirect('/login');
    } else {
      bcrypt.compare(password, userExist.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.redirect('/login');
        } else if (result) {
          req.login(userExist, (err) => {
            if (err) {
              console.error("Error logging in user:", err);
              res.redirect('/login');
            } else {
              console.log('successful');
              res.redirect('/articles');
            }
          });
        } else {
          res.redirect('/login');
        }
      });
    }
  } catch (err) {
    console.error('error');
    console.log(err);
    res.redirect('/login');
  }
};

export const createUserController = async (req, res) => {
    const {email, password} = req.body;
try {
   const userExist = findUserByEmail (email);
   if (!userExist) {
    console.log(`Utilisateur ${email} existe deja.`);
    res.redirect('/register'); // erreur de connexion
   } else {
    const hashPassword = bcrypt.hash(password, saltRounds);

    const newUser = await addUser(email, hashPassword);
    //connexion user
    req.login(newUser, (error) =>{
        if(error){
            console.error('Automaticilly erreur', error);
            res.redirect('/register');
        }else{
            console.log('Successful');
            res.redirect('/articles')
        }
    });
   }

} catch (error) {
    console.log('erreur : ');
    console.error('erreur ', error);
    res.redirect('/articles');
}
}