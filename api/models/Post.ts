import mongoose, {Schema, Types} from 'mongoose';
import User from './User';

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
    // validate: {
    //   validator: async function (this: HydratedDocument<PostType>)
    // }
  },
  image: String,
});

const Post = mongoose.model('Post', PostSchema);
export default Post;