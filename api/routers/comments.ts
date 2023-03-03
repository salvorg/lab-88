import express from 'express';
import Comment from '../models/Comment';
import mongoose from 'mongoose';
import {CommentType} from '../types';
import auth, {RequestWithUser} from '../middleware/auth';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const result: CommentType[] = await Comment.find({post: req.query.post_id as string}).populate('user', 'displayName');

    return res.send(result);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

commentsRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const commentData: CommentType = {
      user: user._id.toString(),
      post: req.body.post,
      comment: req.body.comment,
    };

    const comment = new Comment(commentData);
    await comment.save();

    return res.send(comment);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default commentsRouter;