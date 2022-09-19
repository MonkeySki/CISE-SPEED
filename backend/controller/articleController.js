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
        res.send('Testing that this works')
    },

    testPost:(req,res) =>{
        let newPost = req.body;
        var name = {name:"jhon"};
        let post = new Post(name);
        
        post.save((err)=>{
            if(err){
                return res.status(400).json(err);
            }
            res.json(post);
        });
      
    }
};