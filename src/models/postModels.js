import pool from '../config/db.js';

// Get all posts
export const getAllPosts = async () => {
  try {
    const results = await pool.query(`
      SELECT * FROM public.posts
      ORDER BY post_id ASC;
    `);
    return results.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des posts:', error);
    throw error;
  }
};

// Get post by post id
export const getPostById = async (postId) => {
  try {
    const postResult = await pool.query('SELECT * FROM posts WHERE post_id = $1', [postId]);
    return postResult.rows[0];
  } catch (error) {
    throw error;
  }
};

// Create post
export const createPost = async (topic, body) => {
  try {
    const result = await pool.query('INSERT INTO posts (topic, body) VALUES ($1, $2) RETURNING *', [topic, body]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Update post
export const updatePost = async (post_id, topic, body) => {
  try {
    const result = await pool.query('UPDATE posts SET topic = $1, body = $2 WHERE post_id = $3 RETURNING *', [post_id,topic, body]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Delete post
export const deletePost = async (postId) => {
  try {
    await pool.query('DELETE FROM posts WHERE post_id = $1', [postId]);
  } catch (error) {
    throw error;
  }
};

// Get comments by post id get specific post
export const getCommentsByPostId = async (postId) => {
  try {
    const commentsResult = await pool.query(`
      SELECT comments.comment_id, comments.body AS comment_content, comments.created_at, users.username
      FROM comments
      JOIN users ON comments.user_id = users.user_id
      WHERE comments.post_id = $1
      ORDER BY comments.created_at;
    `, [postId]);
    return commentsResult.rows;
  } catch (error) {
    throw error;
  }
};

// Add comment
export const addComment = async (postId, userId, commentContent) => {
  try {
    const commentResult = await pool.query(`
      INSERT INTO comments (post_id, user_id, body)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [postId, userId, commentContent]);
    return commentResult.rows[0];
  } catch (error) {
    throw error;
  }
};
