import mongoose, {HydratedDocument, Schema} from 'mongoose';
import {PostType} from '../types';

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // validate: {
    //   validator: async function (this: HydratedDocument<PostType>)
    // }
  },
  image: String,
});

const Post = mongoose.model('Post', PostSchema);
export default Post;