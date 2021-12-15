import express from 'express';

import {
    getAllPost,
    createPost,
    getOnePost,
    updatePost,
    deletePost,
} from '../controller/post.js';

export const postRoutes = express.Router();

postRoutes.route('/').get(getAllPost).post(createPost);
postRoutes.route('/:id').get(getOnePost).delete(deletePost).patch(updatePost);





