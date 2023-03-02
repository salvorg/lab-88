import express from 'express';
import auth from '../middleware/auth';
import {imagesUpload} from '../multer';
import {PostType} from '../types';
import Post from '../models/Post';
import mongoose from 'mongoose';

const postsRouter = express.Router();

postsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const postData: PostType = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
    };

    const post = new Post(postData);

    await post.save();
    return res.send(post);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

postsRouter.get('/', async (req, res) => {
  try {
    const result = await Post.find();
    return res.send(result);
  } catch {
    return res.sendStatus(500);
  }
});

postsRouter.get('/:id', async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);

    if (!result) {
      return res.sendStatus(404);
    }

    return res.send(result);
  } catch {
    return res.sendStatus(500);
  }
});

export default postsRouter;