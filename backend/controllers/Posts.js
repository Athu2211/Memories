import mongoose from 'mongoose';
import Posts from '../models/Post.js';


export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        //getting start index of every page
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Posts.countDocuments({});
        //sorting it to get new post first
        //limiting the no of posts
        //jumping to the required page
        const posts = await Posts.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        // const posts = await Posts.find();
        // res.status(200).json(posts);
        
        res.status(200).json({  data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
    } catch (err) {
        res.status(500).json(err);
    }
}
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Posts.findById(id);
        
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json(err);
    }
}
//Query => '/posts?page=1'
//Params => '/posts/:id'
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i'); 
        // i is for ignoring case
        //finding post that match one of the two criteria
        //since tag is an array we are checking it
        const posts = await Posts.find({ $or: [ {title}, { tags: { $in: tags.split(',')}}]});
        res.status(200).json({data:posts});
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new Posts({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

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

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Posts.findById(id);

    //to check if the user has already liked the post
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        //like the post
        post.likes.push(req.userId);
    } else {
        //dislike the post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // const likedPost = await Posts.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    const likedPost = await Posts.findByIdAndUpdate(id, post, { new: true });

    res.json(likedPost);
}