import express from 'express';
import cors from 'cors';
import * as mongoose from "mongoose";
import config from "./config";
import userRouter from "./routers/users";
import postRouter from "./routers/posts";
import commentRouter from "./routers/comments";


const app = express();
const port = 8000;

// app.use(cors(
//     {
//         origin: ['http://localhost:3000'],
//         methods:['GET,HEAD,PUT,PATCH,POST,DELETE'],
//         credentials: true
//     }
// ));

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Private-Network", "true");

    res.setHeader("Access-Control-Max-Age", "7200");

    next();
});
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

