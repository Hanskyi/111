import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    db: 'mongodb+srv://haneginbaev:08YpaSn6LBAJM4Ui@cluster0.8krx5ff.mongodb.net/?retryWrites=true&w=majority',
};

export default config;