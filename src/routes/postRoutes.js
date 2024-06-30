import express from 'express';
import {
  getPostByIdController,
  createPostController,
  updatePostController,
  deletePostController,
  showAddCommentForm,
  addCommentController,
  getAllPostsController,
  homeRoute,
  localLogin,
  googleLogin,
  googleCallback,
  createUserController,
  getLoginPage,
  getRegisterPage,
} from '../controllers/postController.js';
import { isAuthenticated } from '../middlewares/errorHandle.js';

const router = express.Router();
// home

router.get('/', homeRoute);
router.get("/index", homeRoute);
// Get All Post
router.get('/posts', getAllPostsController)

// Get post by ID
router.get('/posts/:id', getPostByIdController);

// Create a new post
router.post('/posts', createPostController);

// Update an existing post
router.put('/posts/:post_id', updatePostController);

// Delete an existing post
router.delete('/posts/:post_id', deletePostController);

// Get comments for a post
router.get('/posts/:post_id/comments', showAddCommentForm);

// Add a comment to a post
router.post('/comments/:id', isAuthenticated, addCommentController);

//get login
router.get('/login', getLoginPage);
// get register
router.get('/register', getRegisterPage);
// inscription connexion
router.post("/register", createUserController);
//router.post('/login', connexionUserController);
//authgoogle
router.post("/login", localLogin);

router.get("/auth/google", googleLogin);

router.get( "/auth/google/index",googleCallback);

export default router;
