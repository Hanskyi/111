import mongoose, {HydratedDocument} from "mongoose";
import {IPostData} from "../type";
import User from "./User";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    description: {
        type: String,
        validate: {
            validator: async function (this: HydratedDocument<IPostData>) {
                return !(!this.image && !this.description);
            },
            message: 'Description and image cannot both be empty!'
        }
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'User does not exist!',
        },
    },
    title: {
        type: String,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    image: String,
    comments: Number
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
