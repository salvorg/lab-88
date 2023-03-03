import mongoose, {Schema, Types} from 'mongoose';
import User from './User';
import Post from './Post';

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Post.findById(value),
      message: 'Post does not exist'
    }
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;