import express from "express";
import Comment from "../models/Comment";
import mongoose, {Error} from "mongoose";
import {ICommentData} from "../type";
import auth, {IRequestWithUser} from "../midlleware/auth";
import Post from "../models/Post";

const commentRouter = express.Router();

commentRouter.get('/:id', async (req, res, next) => {
    try {
        const comments = await Comment.find({post: req.params.id}).populate({path: 'user', select: '-_id username'});
        res.send(comments);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

commentRouter.post('/', auth, async (req, res, next) => {
    const user = (req as IRequestWithUser).user;
    const {postId, description} = req.body
    const post = await Post.findById(postId);

    if (!post) {
        return res.status(401).send({error: 'No post present!'});
    }

    const data: ICommentData = {
        user: String(user._id),
        post: String(post._id),
        description: description
    };

    try {
        const newComment = new Comment(data);
        await newComment.save();

        return res.send({
            newComment
        });

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }

});
export default commentRouter;