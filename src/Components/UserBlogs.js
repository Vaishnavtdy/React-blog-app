import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import axios from 'axios'

function UserBlogs() {
  const id = localStorage.getItem("userId")
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    sendRequest().then((data)=>{
      setBlogs(data.user.blogs)
    })
  }, [])
  const sendRequest = async() => {
    const res = await axios.get(`https://react-blog-app2652.herokuapp.com/api/blog/user/${id}`)
    .catch((err)=> console.log(err))
    const data = await res.data
    return data
  }
  return (
    <div className='pt-5 container d-flex flex-column align-items-center'>
      {blogs && blogs.map((blog)=>(
        <Blog title={blog.title} blogId={blog._id} user={id} description={blog.description} image={blog.image} id={blog.user} />
      ))
      }
    </div>
  )
}

export default UserBlogs