import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Blog from './Blog'

function ViewBlog() {
    const blogId = useParams().id
    const [blog, setBlog] = useState([])
    const sendRequest = async () => {
        const res = await axios.get(`https://react-blog-app2652.herokuapp.com/api/blog/${blogId}`)
        .catch((err)=> console.log(err))
        const data = await res.data
        return data
    }
    useEffect(() => {
      sendRequest().then((data)=>{
        setBlog(data.blog)
      })
    }, [])
    
  return (
    <div className='container d-flex justify-content-center'>
        <Blog title={blog.title} userName={blog.user.name} blogId={blog._id} user={blog.user} description={blog.description} image={blog.image} id={blog.user} />
    </div>
  )
}

export default ViewBlog