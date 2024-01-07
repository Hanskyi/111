import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPost } from './postsSlice';
import AppToolbar from '../../components/UI/AppToolbar/AppToolbar';
import { Fade, Slide } from 'react-awesome-reveal';
import { apiUrl } from '../../constants';
import imageNotAvailable from '../../assets/images/imageNotAvailable.png';
import { useParams } from 'react-router-dom';
import { fetchOnePost } from './postsThunk';
import dayjs from 'dayjs';
import Comments from '../comments/Comments';
import Spinner from '../../components/Spinner/Spinner';

const OnePost = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);

  let postImage = imageNotAvailable;

  useEffect(() => {
    if (id) {
      dispatch(fetchOnePost(id));
    }
  }, [dispatch, id]);

  if (post?.image) {
    postImage = apiUrl + '/' + post?.image;
  }

  return (
    <>
      <AppToolbar/>
      <div className="main">
        {
          post ?
            <>
              <Slide>
                <h1 className="titles">{post.title}</h1>
                <div className="hr"></div>
              </Slide>
              <div className="post-wrap">
                <div className="post-one">
                  <Fade>
                    <div className="post-one-left">
                      <img src={postImage} alt={post.title} className="post-one-img"/>
                    </div>
                    <div>
                      <div className="post-one-right">
                        <h2 className="post-one-title">{post.user}</h2>
                        <span className="post-one-date">
                          <i>
                            {dayjs(post.datetime).format('DD.MM.YYYY (HH:mm:ss)')}
                          </i>
                        </span>
                      </div>
                    </div>
                  </Fade>
                </div>
                <div className="post-one-txt">
                  {post.description}
                </div>
              </div>

            </>
            :
            <Spinner/>
        }
        <Comments/>
      </div>
    </>
  );
};

export default OnePost;