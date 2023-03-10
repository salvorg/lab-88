import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('comments');
    await db.dropCollection('posts');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [firstUser, secondUser] = await User.create({
    username: "firstUser",
    displayName: "Anatoly",
    password: "123",
    token: crypto.randomUUID()
  },{
    username: "secondUser",
    displayName: "Petrovich",
    password: "321",
    token: crypto.randomUUID()
  });

  const [post1, post2] = await Post.create({
    user: firstUser._id,
    title: "Prodam morkovku",
    description: "Ochen vkusnaya morkovka",
    image: "fixtures/morkovka.jpg",
    createdAt: "2023-03-03T18:01:10.724Z",
  }, {
    user: secondUser._id,
    title: "Kuplu kartoshku",
    description: "Nujna ochen vkusnaya kartoshka",
    image: null,
    createdAt: "2023-03-03T19:01:10.724Z",
  });

  await Comment.create({
    user: firstUser._id,
    post: post1._id,
    comment: "Realno govoru ochen vkusnaya",
    createdAt: "2023-03-03T12:01:10.724Z",
  }, {
    user: firstUser._id,
    post: post2._id,
    comment: "Prodam tebe, skolko vozmesh?",
    createdAt: "2023-03-03T17:01:10.724Z",
  }, {
    user: secondUser._id,
    post: post1._id,
    comment: "Pokupal u tebya, ne takaya uj i vkysnaya",
    createdAt: "2023-03-03T15:01:10.724Z",
  }, {
    user: secondUser._id,
    post: post2._id,
    comment: "Ne vozmu, daje ne prosi",
    createdAt: "2023-03-03T14:01:10.724Z",
  });

  await db.close();
};
void run();
