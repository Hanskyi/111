import React from 'react';
import imageNotAvailable from '../assets/images/imageNotAvailable.png';
import { apiUrl } from '../constants';
import { Post } from '../type';
import dayjs from 'dayjs';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

interface Props {
  posts: Post
}

const PostItem: React.FC<Props> = ({posts}) => {
  let postImage = imageNotAvailable;

  if (posts.image) {
    postImage = apiUrl + '/' + posts.image;
  }

  return (
    <Fade>
      <Link to={`/posts/${posts._id}`} className="post-link">
        <div key={posts._id} className="post-item">
          <div>
            <img src={postImage} alt={posts.title} className="post-image"/>
          </div>
          <div className="post-title">
            <h2>{posts.title} </h2>
            <span className="post-author">Author: {posts.user.username}</span>
          </div>
          <div className="post-date">{dayjs(posts.datetime).format('DD.MM.YYYY (HH:mm:ss)')}</div>
          <div className="post-comments">
            <i>comments amount:{posts.comments} </i>
          </div>
        </div>
      </Link>
    </Fade>
  );
};

export default PostItem;