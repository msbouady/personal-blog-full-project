import {
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCommentsByPostId,
  addComment,
  getAllPosts,
  addUser,
  findUserByEmail,
  getUserById,
} from '../models/postModels.js';
import bcrypt from "bcrypt";
import passport from "../config/passport.js";

const API_URL = "http://localhost:4000";
const saltRounds = process.env.DB_SALT;


export const getAllPostsController = async (req, res) =>{
  try{
    const results = await getAllPosts();
    return results;
  }catch(error){
    console.error(error);
    res.status(500).send('Server error like')
  }
}
export const getPostByIdController = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    const comments = await getCommentsByPostId(req.params.id);
    console.log(req.params.id)
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('articles.ejs', { post: post, comments: comments });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


export const homeRoute = async (req, res) => {
  try{
    const post = await getAllPosts();
    console.log('Posts récupérés:', post);
    res.render('index', {posts: post}); 
  } catch(error){
    console.error(error);
    res.status(500).send('Server error likes')
  }
};

export const showCreatePostForm = (req, res) => {
  res.render('create-post');
};

export const createPostController = async (req, res) => {
  try {
    const { title, content } = req.body;
    await createPost(title, content);
    res.redirect('/posts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
export const showUpdatePostForm = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    res.render('update-post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const updatePostController = async (req, res) => {
  try {
    const { title, content } = req.body;
    await updatePost(req.params.id, title, content);
    res.redirect(`/posts/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
export const deletePostController = async (req, res) => {
  try {
    await deletePost(req.params.id);
    res.redirect('/posts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
export const showComments = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    const comments = await getCommentsByPostId(req.params.id);
    res.render('comments', { post: post, comments: comments });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
export const showAddCommentForm = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    res.render('add-comment', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const addCommentController = async (req, res) => {
  try {
    const { comment } = req.body;
    const post_id = req.params.id;
    const user_id = req.user.id;
    
    await addComment(post_id, user_id,comment);
    res.redirect(`/posts/${post_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const addUserController = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    await addUser(username, email, password);
    console.log('user create')
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error user no create');
  }
}

export const findUserByEmailController = async (req, res) =>{
  const email = req.body.email;
  try {
    const user = await findUserByEmail(email);
    if (user){
      req.session.user = user;
      sendResponse(res, 200, 'Logged in');
    }else{
      sendResponse(res, 401, 'Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('user not found')
  }
}

export const getUserByIdControllerx = async (req, res) => {
  const id = req.params.id;
 
  try {
     const resultat = await getUserById(id);
     console.log('id');
  } catch (error) {
    console.error(error);
    res.status(500).send('user not found')
  }
}

export const connexionUserController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userExist = await findUserByEmail(email);
    if (!userExist) {
      res.redirect('/login'); // password or login incorrect
      console.log('password or login incorrect')
    } else {
      bcrypt.compare(password, userExist.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.redirect('/login'); // password or login incorrect
          console.log('password or login incorrects')
        } else if (result) {
          req.login(userExist, (err) => {
            if (err) {
              console.error("Error logging in user:", err);
              res.redirect('/login');// password or login incorrect
              console.log('password or login incorrect user')
            } else {
              console.log('successful');
              res.redirect('/index');
            }
          });
        } else {
          res.redirect('/login');
          console.log('password or login incorrect not')
        }
      });
    }
  } catch (err) {
    console.error('error');
    console.log(err);
    res.redirect('/login');
    console.log('password or login incorrect yes')
  }
};


export const createUserController = async (req, res) => {
  const {username, email, password} = req.body;
try {
 const userExist = findUserByEmail (email);
 if (!userExist) {
  console.log(`Utilisateur ${email} existe deja.`);
  res.redirect('/login'); // user already exist
 } else {
  const hashPassword = bcrypt.hash(password, saltRounds);

  const newUser = await addUser(username, email, hashPassword);
  //connexion user
  req.login(newUser, (error) =>{
      if(error){
          console.error('Automaticilly erreur', error);
          res.redirect('/register');
      }else{
          console.log('Successful');
          res.redirect('/index')
      }
  });
 }

} catch (error) {
  console.log('erreur : ');
  console.error('erreur ', error);
  res.redirect('/register');
}
}

export const localLogin = passport.authenticate("local", {
  successRedirect: "/index",
  failureRedirect: "/login",
});

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = passport.authenticate("google", {
  successRedirect: "/index",
  failureRedirect: "/login",
});