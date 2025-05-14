const { upload } = require('../middlewares/multer.middleware');
const foodCollection =   require('../models/food.model');
const { uploadImgOnCloudinary } = require('../utils/cloudinary.utils');

exports.addFood = async (req, res) => {
    // console.log(req.file);

    const { name, description, price, category } = req.body;
    const { path } = req.file;
    let { asset_id, public_id, secure_url } = await uploadImgOnCloudinary (path);
    console.log(asset_id);
    // console.log(result);
//     let newFood  = await foodCollection.create({    
//         name,
//         description,
//         price,
//         category,
//         "image.url": secure_url,
//         "image.public_id": public_id,
//         "image.asset_id": asset_id,
        
//     });
//     res.json({
//         status: "success",
//         message: "Food added successfully",
//         data: newFood,
//     });
 };