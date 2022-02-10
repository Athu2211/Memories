import Posts from '../models/Post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createPost = async (req, res) => {
    const newPost = new Posts(req.body);

    try {
        const savePost = await newPost.save();
        res.status(201).json(savePost);
    } catch (err) {
        res.status(409).json(err);
    }
}