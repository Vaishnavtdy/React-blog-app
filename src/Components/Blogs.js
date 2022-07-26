import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const sendRequest = async() => {
    const res = await axios.get("https://react-blog-app2652.herokuapp.com/api/blog/")
      .catch((err)=>console.log(err))
    const data = res.data
    return data  
  }
  useEffect(() => {
    sendRequest().then((data)=>{
      setBlogs(data.blogs)
    })
  }, [])
  return (
    <div className='pt-5 container d-flex flex-column align-items-center'>
    {blogs &&
      blogs.map((blog, index) => (
        <Blog title={blog.title} blogId={blog._id} user={blog.user._id} description={blog.description} image={blog.image} id={blog.user} userName={blog.user.name} />
      ))
  }
    </div>
  )
}

export default Blogs