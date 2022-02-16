import mongoose from 'mongoose';
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

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await Posts.findByIdAndUpdate(id, { ...post, id }, { new: true })

    res.status(202).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Posts.findByIdAndRemove(id);

    res.json({ message: `Post with ${id} deleted successfully` })
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Posts.findById(id);

    const likedPost = await Posts.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(likedPost);
}