import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";
import Post from "./models/Post";
import Comment from "./models/Comment";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch (e) {
      console.log("Collection were not present, skipping drop...");
  }

  const [firstUser, secondUser] = await User.create(
      {
          username: 'Violetta',
          password: '123',
          token: randomUUID(),
      }, {
          username: 'Magomed',
          password: '123',
          token: randomUUID(),
      }
  );

  const [firstUserPost, secondUserPost] = await Post.create(
      {
          user: firstUser._id,
          title: 'Aztec Treasure',
          description: "Where does it come from?",
          image: 'fixtures/aztecs.jpg'
      },

      {
          user: secondUser._id,
          title: 'The Hunger Games',
          description: 'Where can I get some?',
          image: 'fixtures/magomed.jpg'
      }
  );

  const comments = await Comment.create(
      {
          user: firstUser._id,
          post: firstUserPost._id,
          description: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type",
      },
      {
          user: secondUser._id,
          post: firstUserPost._id,
          description:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
      },
      {
          user: firstUser._id,
          post: secondUserPost._id,
          description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,',
      },
      {
          user: secondUser._id,
          post: secondUserPost._id,
          description: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de " by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by.',
      }
  );
  await db.close();
};
run().catch(console.error);