const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const userSchema  = new mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,"name is required"],
        
    },
    email:{ 
        type:String,
        required:[true,"email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[7,"minimum length should be 7"],
    },
    phoneNumber:{
        type:String,
        required:[true,"phone number is required"],
    },
    cartData:{
        type: Object,
        default: {},
    },
    tokenVersion:{
        type: Number,
        default: 0,
    },

    role:  {

        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

}, { timestamps: true, minimize:false});76

// ! password hashing
userSchema.pre("save", async function (){
    if(!this.isModified("password")) return;
    let salt  = await bcryptjs.genSalt(12); //random string
    let hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcryptjs.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User", userSchema);