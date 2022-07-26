import express, { application } from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 8000
app.use(cors())
app.use(express.json())
app.use("/api/user", router)
app.use("/api/blog", blogRouter)
mongoose
  .connect( process.env.MONGODB_URI ||
    "mongodb+srv://Admin:CRuOAqn5vCzXm3pY@cluster0.jiedk1k.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {app.listen(PORT)})
  .then(()=>{console.log("Database connected to port localhost 5000")})
  .catch((err)=>console.log(err))

if(process.env.NODE_ENV == 'production'){
  app.use(express.static("frontend/build"))
}