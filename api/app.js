const express = require('express');
const app = express();
const Post = require("./models/posts")
const postsData = new Post();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})//response from the server has been blocked, so we need to set a share with '*'
//middleware will be used to set the share function

app.use('/uploads', express.static('uploads'));
//this function is to make the static folder publicly visible

app.get('/api/posts', (req,res) => {
    res.status(200).send(postsData.get());
})

app.get('/api/posts/:post_id', (req,res) => {
    const postID = req.params.post_id;
    const foundPost = postsData.getIndividualBlog(postID);
    if (foundPost) {
        res.status(200).send(foundPost)
    } else {
        res.status(404).send("Not found")
    }
})
app.listen(3000, () => console.log("listening on http://localhost:3000"))