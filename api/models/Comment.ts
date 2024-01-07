import mongoose from "mongoose";
import User from "./User";
import Post from "./Post";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'User does not exist!',
        },
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await Post.findById(value),
            message: 'Post does not exist!',
        },
    },

    description: String,
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;