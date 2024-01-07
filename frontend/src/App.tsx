import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Posts from './containers/Posts/Posts';
import Register from './containers/User/Register';
import Login from './containers/User/Login';
import NewPosts from "./containers/Posts/NewPosts";
import OnePost from "./containers/Posts/OnePost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/posts/:id" element={<OnePost/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add-post" element={<NewPosts/>}/>
      </Routes>
    </>
  );
}

export default App;
