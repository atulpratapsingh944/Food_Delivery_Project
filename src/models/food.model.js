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
        secure_url:{
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





// {
//   asset_id: 'aa5e339c04e8165dfcf564fae22ae57c',
//   public_id: 'yf7fk3elkdngqdw1vo3j',
//   version: 1747294454,
//   version_id: '43be79cce0c1a706799b154bb330de0e',
//   signature: '8b96376ca545159cd836e17d02876a9c1fb20a3d',
//   width: 206,
//   height: 244,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2025-05-15T07:34:14Z',
//   tags: [],
//   bytes: 13727,
//   type: 'upload',
//   etag: 'fe85696e87957092cebd06cb4435984e',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dgqkgpnes/image/upload/v1747294454/yf7fk3elkdngqdw1vo3j.jpg',
//   secure_url: 'https://res.cloudinary.com/dgqkgpnes/image/upload/v1747294454/yf7fk3elkdngqdw1vo3j.jpg',
//   asset_folder: '',
//   display_name: 'yf7fk3elkdngqdw1vo3j',
//   original_filename: '1747294453301----download',
//   original_extension: 'jpeg',
//   api_key: '871529372528524'
// }
