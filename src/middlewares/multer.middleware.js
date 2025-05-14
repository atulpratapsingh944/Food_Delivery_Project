const multer = require("multer");
const path =  require("path");

const myStorage = multer.diskStorage({
    destination: function(req,file,cb){
         cb(null,"path");
    },   //&  "/uploads/temp" make sure that this folder sturture is present 
    filename: function (req,file,cb) {
        cb(null,Date.now() + "----" + file.originalname);
    },
});

let upload  = multer ({ storage:myStorage });
module.exports = { upload };

// ! multimedia ==> image, video, audio, document

