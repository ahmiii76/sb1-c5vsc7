import express from 'express';
import { getCommunities, createCommunity, joinCommunity } from '../controllers/communities.js';

const router = express.Router();

router.get('/', getCommunities);
router.post('/', createCommunity);
router.post('/:id/join', joinCommunity);

export default router;