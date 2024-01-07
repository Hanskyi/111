import express from "express";
import Post from "../models/Post";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import {IPostData} from "../type";
import auth, {IRequestWithUser} from "../midlleware/auth";
import Comment from "../models/Comment";
import User from "../models/User";

const postRouter = express.Router();

postRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as IRequestWithUser).user;

        const {title, description} = req.body;

        const newPostData: IPostData = {
            user: String(user._id),
            title: title,
            description: description,
            image: req.file ? req.file.filename : null,
        };

        const newPost = new Post(newPostData);
        await newPost.save();
        return res.send(newPost);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

postRouter.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate({path: 'user', select: '-_id username'}).sort({datetime: -1});
        if (!posts) {
            return res.status(404).send("Not found!");
        }
        const commentsPosts = await Promise.all(posts.map(async (item) => {
            const commentsFind = await Comment.find({post: item._id});
            const itemObject = item.toObject();
            return ({
                ...itemObject,
                comments: commentsFind.length
            });
        }));

        return res.send(commentsPosts);
    } catch (e) {
        return res.status(500).send('Server error');
    }
});

postRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send("Not found!");
        }

        const user = await User.findById(post.user);

        if (!user) {
            return res.status(404).send("Not found!");
        }

        const newPost = {
            _id: post._id,
            description: post.description,
            user: user.username,
            title: post.title,
            image: post.image,
            datetime: post.datetime,
        };

        return res.send(newPost);
    } catch (e) {
        return res.status(500).send('Server error');
    }
});
export default postRouter;