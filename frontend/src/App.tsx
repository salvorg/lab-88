import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container, CssBaseline} from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import NewPost from "./features/posts/NewPost";
import Posts from "./features/posts/Posts";
import Post from "./features/posts/Post";

const App = () => {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Posts/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/add-new-post" element={<NewPost/>}/>
            <Route path="/post/:id" element={<Post/>}/>
            <Route path="*" element={(<h3>Спору нет, если ищешь, то всегда что-нибудь найдешь, но совсем не обязательно то, что искал.</h3>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}
export default App;
