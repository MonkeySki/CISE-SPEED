const mongoose = require("mongoose");
const Article = require("../models/article");
const Post = require("../models/post")

//article creation

module.exports = {

    createArticle: (req,res) =>{
        let newArticleDetails = req.body;
        newArticleDetails._id =new mongoose.Types.ObjectId();
        let article = new Article(newArticleDetails);
        article.save((err)=>{
            if(err){
                return res.status(400).json(err);
            }
            res.json(article);
        });
    },

    test:(req,res) =>{
        Post.find((error, data) => {
            if (error) {
              return next(error)
            } else {
              //Transform card data into json and set as res
              res.json(data)
            }
        // res.send('Testing that this works')
    })
    },

    testPost:(req,res) =>{
        let newPost = req.body;
        var name = {name:"jhon"};
        let post = new Post(name);
        console.log("Clear?")
        
        post.save((err)=>{
            if(err){
                console.log("NO")
                return res.status(400).json(err);
            }
            console.log("YES?")
            res.json(post);
        });
      
    }
};