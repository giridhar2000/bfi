const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config();

const app = express();

const port = process.env.REACT_APP_PORT || 5000

app.use(express.json());
app.use(cors());

const PostSchema = require("./models/Posts")

mongoose.connect(process.env.REACT_APP_MONGODB_CONNECT_URI);


app.get("/", async(req,res) => {
    const data = await PostSchema.find({})
    res.send(data)
})

app.post("/getblog", async(req,res) => {
    const id = req.body.id
    const data = await PostSchema.findOne({_id: id})
    try{
        if(data){
            res.send(data)
        }else{
            res.send("no post found")
        }
    }
    catch(err){
        res.send(err)
    }
    
})

app.post("/post", async(req,res) => {
    const t = req.body.title
    const s = req.body.subtitle
    const b = req.body.body
    const an = req.body.authorName
    const ap = req.body.authorProfile
    const d = req.body.PostedDate
    const cp = req.body.coverPic
    const post = new PostSchema({authorName: an, date: d, title:t, body:b, subtitle:s, authorProfile: ap, coverPic: cp})
    try{
        await post.save();
        if(post.save()){
            res.send({Posted: true})
        }cp
    }catch(err){
        res.send(err)
    }
})

app.delete("/delPost", async(req,res) => {
    const id = req.body.id
    const delPost = await PostSchema.deleteOne({_id: id})
    try{
        if(delPost){
            res.send("post deleted")
        }else{
            res.send("no post found")
        }
    }
    catch(err){
        res.send(err)
    }
})


app.listen(port || 5000, ()=> {
    console.log("App is running...", port);
});
