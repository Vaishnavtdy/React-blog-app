import "./App.css";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from './Components/Blogs'
import UserBlogs from './Components/UserBlogs'
import Login from './Components/Login'
import AddBlog from './Components/AddBlog'
import Signup from './Components/Signup'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import {authActions} from './store'
import BlogDetails from "./Components/BlogDetails";
import ViewBlog from "./Components/ViewBlog";

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }
  }, [])
  
  return (
    <>
    <header>
      <Header />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Blogs/> } />
        <Route path="/login" element={<Login/> } />
        <Route path="/myblogs" element={<UserBlogs />} />
        <Route path="/myblogs/:id" element={<BlogDetails />} />
        <Route path="/addblogs" element={<AddBlog /> } />
        <Route path="/signup" element={<Signup/> } />
        <Route path="/view/:id" element={<ViewBlog/> } />
      </Routes>
    </main>
    </>
  );
}

export default App;
