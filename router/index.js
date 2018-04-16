import express from 'express';
import users from './users';
import friends from './friends';

const router = express.Router();

router.use('/users', users)
router.use('/friends', friends)

export default router;
