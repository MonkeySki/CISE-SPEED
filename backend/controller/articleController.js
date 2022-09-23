// const Article = require("../models/article");
const Posts = require("../models/post")

//article creation

module.exports = {

    // createArticle: (req,res) =>{
    //     let newArticleDetails = req.body;
    //     newArticleDetails._id =new mongoose.Types.ObjectId();
    //     let article = new Article(newArticleDetails);
    //     article.save((err)=>{
    //         if(err){
    //             return res.status(400).json(err);
    //         }
    //         res.json(article);
    //     });
    // },

    testFind:((req,res) =>{
        //Finds all cards
        Posts.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          //Transform card data into json and set as res
          res.json(data)
        }
        //Sort by count in descending order with a limit of 8
      })
    }),

    testPost:(req,res) =>{
    
        var name = {name:"jhon"};
        let post = new Posts(name);
        console.log(post)
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