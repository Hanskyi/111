import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { userReducer } from '../containers/User/userSlice';
import { commentsReducer } from '../containers/comments/CommentsSlice';
import {postsReducer} from '../containers/Posts/postsSlice';
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';



const usersPersistConfig = {
  key: 'forum:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  comments: commentsReducer,
  posts: postsReducer,
  users: persistReducer(usersPersistConfig, userReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);