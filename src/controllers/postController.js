import {
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCommentsByPostId,
  addComment,
  getAllPosts,
} from '../models/postModels.js';

export const getAllPostsController = async (req, res) =>{
  try{
    const results = await getAllPosts();
    res.status(200).json(results);
  }catch(error){
    console.error(error);
    res.status(500).send('Server error like')
  }
}
export const getPostByIdController = async (req, res) => {
  try {
   
    const post = await getPostById(req.params.id);
    res.render('post', { post });
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
    res.render('comments', { post, comments });
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
    await addComment(req.params.id, comment);
    res.redirect(`/posts/${req.params.id}/comments`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
