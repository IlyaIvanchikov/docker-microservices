import { Post } from '../models/post.js';

export const getAllPost = async (req, res, next) => {
    try {
        const data = await Post.find();

        res.status(200).json({
            data,
            status: 'succes',
            results: data.length,
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail',
        });
    }
};

export const createPost = async (req, res, next) => {
    try {
        const data = await Post.create(req.body);
        res.status(200).json({
            data,
            status: 'succes',
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail',
        });
    }
};

export const getOnePost = async (req, res, next) => {
    try {
        const data = await Post.findById(req.params.id);

        res.status(200).json({
            data,
            status: 'succes',
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail',
        });
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const data = await Post.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true,
        });

        res.status(200).json({
            data,
            status: 'succes',
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail',
        });
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const data = await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({});
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail',
        });
    }
};
