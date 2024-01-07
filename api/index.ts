import express from 'express';
import cors from 'cors';
import * as mongoose from "mongoose";
import config from "./config";
import userRouter from "./routers/users";
import postRouter from "./routers/posts";
import commentRouter from "./routers/comments";


const app = express();
const port = 8000;

app.use(cors(
    {
        origin: ['http://localhost:3000'],
        methods:["POST", "GET", "DELETE"],
        credentials: true
    }
));
app.use(express.static('public'));
app.use(express.json());
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/users', userRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));

