import express from 'express';
import { auth } from '../middleware/auth.js';
import {
    getAllPost,
    createPost,
    getOnePost,
    updatePost,
    deletePost,
} from '../controller/post.js';

export const postRoutes = express.Router();

postRoutes.route('/').get(auth, getAllPost).post(auth, createPost);
postRoutes
    .route('/:id')
    .get(auth, getOnePost)
    .delete(auth, deletePost)
    .patch(auth, updatePost);
