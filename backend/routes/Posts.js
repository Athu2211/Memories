import express from 'express';
import { getPosts, createPost } from '../controllers/Posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);


export default router;