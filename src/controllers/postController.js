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
  deleteComment,
  udpadteComment,
  getCommentById,
  getUsernameByComments,
} from '../models/postModels.js';
import bcrypt from "bcrypt";
import passport from "../config/passport.js";
import nodemailer from "nodemailer";
import { emailConfig } from '../config/request.js';


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
    const user_id = req.user.id;
    const post_id = req.params.id;

    const post = await getPostById(post_id);
    const comments = await getCommentsByPostId(post_id);

    res.render('articles.ejs', {
      post: post,
      comments: comments,
      user_id : user_id,
    });
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
    const userEmail =req.user.email

    const post_ = await getPostById(post_id);
    const under_topic = post_.under_topic;
    await addComment(post_id, user_id, comment);

    // my email auth configuration
    const transporter = nodemailer.createTransport(emailConfig);

    // option email to send 
    const mailOptions = {
      from: emailConfig.auth.user,
      to: userEmail,
      subject: 'MY COMMENT ON PERSONNAL BLOG',
      text: `A new comment left by you on post . Tile: ${under_topic}`
    };

    // send email
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.redirect(`/posts/${post_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
export const getUpdatePage = async (req, res) => {
  const idComment = req.params.id;
  try {
    const comments = await getCommentById(idComment); // Utilise la variable idComment au lieu de id
    const commentsDate = comments.created_at;
    const commentsBody = comments.body;
    const commentsIdPost = comments.post_id;
    const commentsIdUser = comments.user_id;

    const getUsername = await getUsernameByComments(commentsIdUser, commentsIdPost, idComment);

    res.render('modifArticle.ejs', {
      commentsBody: commentsBody,
      getUsername: getUsername,
      commentsDate: commentsDate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating comment');
  }
};

export const updateCommentPage = async (req, res) => {
  const idComment = req.params.id;
  try {
    const updatedContent = req.body.content;
    await udpadteComment(idComment, updatedContent); 

    res.redirect(`/posts/${postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating comment');
  }
};
export const updateCommentController = async (req, res) => {
  const idComment = req.params.id;
  const contentComment = req.body;

  try {
    const comment = await getCommentById(idComment); 
    const postId = comment.post_id;

    await udpadteComment(idComment, contentComment);
    res.redirect(`/posts/${postId}`); 

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error comment no delete');
  }
};

export const deleteCommentController = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await getCommentById(commentId); 
    const postId = comment.post_id;

    await deleteComment(commentId); 

    res.redirect(`/posts/${postId}`); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error comment no delete');
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
};

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
    res.status(500).send('user not found');
  }
};

export const getUserByIdControllerx = async (req, res) => {
  const id = req.params.id;
 
  try {
     const resultat = await getUserById(id);
     console.log('id');
  } catch (error) {
    console.error(error);
    res.status(500).send('user not found');
  };
};

export const connexionUserController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userExist = await findUserByEmail(email);
    if (!userExist) {
      res.redirect('/login'); // password or login incorrect
      console.log('password or login incorrect');
    } else {
      bcrypt.compare(password, userExist.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.redirect('/login'); // password or login incorrect
          console.log('password or login incorrects');
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
          console.log('password or login incorrect not');
        }
      });
    }
  } catch (err) {
    console.error('error');
    console.log(err);
    res.redirect('/login');
    console.log('password or login incorrect yes');
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
          res.redirect('/index');
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

export const getLoginPage = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const getRegisterPage = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
