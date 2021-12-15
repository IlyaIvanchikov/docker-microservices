import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Post must have title'],
    },
    body: {
        type: String,
        required: [true, 'Post must have body'],
    },
});

export const Post = mongoose.model('Post', PostSchema);
