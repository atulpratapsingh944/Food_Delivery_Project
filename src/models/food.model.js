const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
        minlength: [10,"minimum length should be 10"],
    },
    price:{
        type:Number,
        required: true,
    },
    image:[
    {
        url:{
            type:String,
            required: true,
        },
        public_id:{
            type:String,
            required: true,
        },
        asset_id:{
            type:String,
            required: true,
        }, 
    },
],
    category:{
        type:String,
        required: true,
    },
},
{timestamps: true}
);
module.exports = mongoose.model("Food",foodSchema);