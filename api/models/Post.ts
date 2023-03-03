import mongoose, {HydratedDocument, Schema, Types} from 'mongoose';
import User from './User';
import {PostType} from '../types';

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validate: {
      validator: async function (this: HydratedDocument<PostType>): Promise<boolean> {
        return Boolean(this.image || this.description);
      },
      message: "Error 1"
    }
  },
  image: {
    type: String,
    validate: {
      validator: async function (this: HydratedDocument<PostType>): Promise<boolean> {
        return Boolean(this.description || this.image);
      },
      message: "Image or description required"
    }
  },
  createdAt: {
    type: Date,
    required: true,
  },
}
);

const Post = mongoose.model('Post', PostSchema);
export default Post;