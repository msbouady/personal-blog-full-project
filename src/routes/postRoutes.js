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
} from '../controllers/postController.js';

const router = express.Router();
// home

router.get('/', homeRoute)
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
router.post('/posts/:post_id/comments', addCommentController);


export default router;
