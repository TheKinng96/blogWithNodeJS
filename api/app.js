const express = require('express');
const app = express();
const Post = require("./models/posts")
const postsData = new Post();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
    }
  })

  const getExt = (mimeType) => {
      switch(mimeType){
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
      }
  }
var upload = multer({storage :storage})

app.use(express.json());


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

app.post('/api/posts', upload.single("post-image"),(req,res) => {
    
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path,
        "added_date": `${Date.now()}`
    }
    console.log(req.file.path)
    postsData.add(newPost);
    res.status(201).send("OK");
})


app.listen(3000, () => console.log("listening on http://localhost:3000"))