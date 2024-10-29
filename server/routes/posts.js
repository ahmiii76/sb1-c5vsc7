import express from 'express';
import { getPosts, createPost, getPost, createReply } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.post('/:id/replies', createReply);

export default router;