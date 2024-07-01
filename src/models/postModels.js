import pool from '../config/db.js';
import dotenv from 'dotenv';
import { queries } from '../config/request.js';

dotenv.config();

const envUser_id = process.env.envUserID;
const envAuthor =process.env.envAuthorName;

// MODELS FOR POSTS
// models get all
export const getAllPosts = async () => {
  try {
    const results = await pool.query(queries.getAllPosts);
    return results.rows;
  } catch (error) {
    console.error('get all posts : ', error);
    throw error;
  }
};
// get by id
export const getPostById = async (postId) => {
  try {
    const postResult = await pool.query(queries.getPostById, [postId]);
    return postResult.rows[0];
  } catch (error) {
    console.error('get by id : ', error);
    throw error;
  }
};
// create post
export const createPost = async ( topic, under_topic, body) => {
  
  try {
    const result = await pool.query(queries.createPost,[envUser_id, topic, under_topic, body, envAuthor]
    );
    return result.rows[0];
  } catch (error) {
    console.error('create post : ', error);
    throw error;
  }
};
// udpadte post
export const updatePost = async (post_id, topic, body) => {
  try {
    const result = await pool.query(queries.updatePost, [post_id,topic, body]);
    return result.rows[0];
  } catch (error) {
    console.error('udpate post : ', error);
    throw error;
  }
};
// delete post
export const deletePost = async (postId) => {
  try {
    await pool.query(queries.deletePost, [postId]);
  } catch (error) {
    console.error('delete post : ', error);
    throw error;
  }
};

// Get comments by post id get specific post
export const getCommentsByPostId = async (postId) => {
  try {
    const commentsResult = await pool.query(queries.getCommentsByPostId, [postId]);
    return commentsResult.rows;
  } catch (error) {
    console.error('get comment by post id get specific post:', error);
    throw error;
  }
};
// MODELS FOR COMMENT
// create comment
export const addComment = async (postId, userId, commentContent) => {
  try {
    const commentResult = await pool.query(queries.addComment, [postId, userId, commentContent]);
    return commentResult.rows[0];
  } catch (error) {
    console.error('add comment : ', error);
    throw error;
  }
};
// delete comment
export const deleteComment = async (idComment) => {
  try {
    const resultDeleteComment = await pool.query(queries.deleteComment, [idComment]);
    return resultDeleteComment;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// get comment by id

export const getCommentById = async (idComment) => {
  try{
    const resultGetComment = await pool.query(queries.getCommentById, [idComment]);
    return resultGetComment;
  }catch(error){
    console.error(error);
    throw error;
  }
}

// Models for USER
// create user
export const addUser = async (username, email, password) =>{
  try{
    const userResult = await pool.query(queries.addUser, [username, email, password]);
      return userResult.rows[0];
  }catch(error){
    console.error('add user : ', error);
    throw error;
  }
}

export const getUserIdByComment = async (id, post_id) => {
  try {
    const userIdResult = await pool.query(queries.getUserIdByComment, [id, post_id]);
    const userId = userIdResult.rows[0];
    return userId;
  }catch(error){
    console.error('get userid by comments : ', error);
    throw error;
  }
}

export const findUserByEmail = async (email) => {
  try {
    const userResult = await pool.query(queries.findUserByEmail, [email]);
    const user = userResult.rows[0];
    if (!user) {
      return null;
    }
    user.id = user.user_id; 
    return user;
  } catch (error) {
    console.error('find email user : ', error);
    throw error;
  }
};


// get user by id

export const getUserById = async (id) => {
  try {
    const userResult = await pool.query(queries.getUserById, [id]);
    const user = userResult.rows[0];
    if (!user) {
      return null;
    }
    user.id = user.user_id;
    return user;
  } catch (error) {
    console.error('get user by id : ', error);
    throw error;
  }
};

