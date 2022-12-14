const mongoose = require ('mongoose');

const ArticleSchema = new mongoose.Schema({
    title:{
        type:String,
        required: false,
    },
    author:{
        type:String,
        required: false,
    },
    journal:{
        type:String,
        required: false,
    },
    year:{
        type:Number,
        required: false,
    },
    volume:{
        type:Number,
        required: false,
    }, 
    number:{
        type:Number,
        required: false,
    }, 
    pages:{
        type:String,
        required: false,
    }, 
    doi:{
        type:String,
        required: false,
    },
    claimStrength:{
        type:String,
        required: false,
    },
    claim:{
        type:String,
        required: false,
    },
    
})

module.exports=mongoose.model('article',ArticleSchema);