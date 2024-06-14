import pool from '../config/db.js';
import dotenv from 'dotenv';
import { queries } from '../config/request.js';

dotenv.config();

const envUser_id = process.env.envUserID;
const envAuthor =process.env.envAuthorName;
// MODELS FOR POSTS
export const getAllPosts = async () => {
  try {
    const results = await pool.query(queries.getAllPosts);
    return results.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des posts:', error);
    throw error;
  }
};

export const getPostById = async (postId) => {
  try {
    const postResult = await pool.query(queries.getPostById, [postId]);
    return postResult.rows[0];
  } catch (error) {
    throw error;
  }
};

export const createPost = async ( topic, under_topic, body) => {
  
  try {
    const result = await pool.query(queries.createPost,[envUser_id, topic, under_topic, body, envAuthor]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (post_id, topic, body) => {
  try {
    const result = await pool.query(queries.updatePost, [post_id,topic, body]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    await pool.query(queries.deletePost, [postId]);
  } catch (error) {
    throw error;
  }
};

// Get comments by post id get specific post
export const getCommentsByPostId = async (postId) => {
  try {
    const commentsResult = await pool.query(queries.getCommentsByPostId, [postId]);
    return commentsResult.rows;
  } catch (error) {
    throw error;
  }
};
// MODELS FOR COMMENT

export const addComment = async (postId, userId, commentContent) => {
  try {
    const commentResult = await pool.query(queries.addComment, [postId, userId, commentContent]);
    return commentResult.rows[0];
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (userId, commentId) => {
  try {
    
    const verifyCommentOwner = await pool.query(queries.getCommentByUserId, [commentId, userId]);

    if (verifyCommentOwner.rowCount > 0) {
      const deleteResult = await pool.query(queries.deleteComment, [commentId]);
      if (deleteResult.rowCount > 0) {
       console.log("comment delete")
      } 
    } else {
      return alert('error');
    }
  } catch (error) {
   throw error;
  }
};


export const addUser = async (username, email, password) =>{
  try{
    const userResult = await pool.query(queries.addUser, [username, email, password]);
      return userResult.rows[0];
  }catch(error){
    throw error;
  }
}
