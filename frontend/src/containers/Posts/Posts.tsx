import React, { useEffect } from 'react';
import AppToolbar from '../../components/UI/AppToolbar/AppToolbar';
import { Slide } from "react-awesome-reveal";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts, selectPostsLoading } from './postsSlice';
import { getPosts } from './postsThunk';
import PostItem from '../../components/PostItem';
import Spinner from '../../components/Spinner/Spinner';

const Posts = () => {
  const dispatch = useAppDispatch();
  const postsState = useAppSelector(selectPosts);
  const fetchLoading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      {fetchLoading ? (
          <div>
            <AppToolbar />
            <div className="main">
              <Spinner />
            </div>
          </div>
      ) : (
        <div>
          <AppToolbar />
          <div className="main">
            <Slide>
              <h1 className='titles'>Posts</h1>
              <div className="hr"></div>
            </Slide>
            <div className="posts">
              {postsState.map(item => (
                <PostItem key={item._id} posts={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
