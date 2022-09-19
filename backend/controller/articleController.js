const mongoose = require("mongoose");
const Article = require("../models/article");

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
    }
};