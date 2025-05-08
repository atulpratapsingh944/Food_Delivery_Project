// npm i express mongoose multer cloudinary bcryptjs dotenv cookie-parser  express-async-handler jsonwebtoken
const app  = require('./app');
const connectDB = require('./src/config/database');

connectDB()
.then(()=>{
    app.listen(process.env.PORT, (err) => {
        if (err)console.log("error while starting the server...");
      console.log('Server is running on port 9000');
    });
})
.catch((err)=> {
     console.log("error occured while connecting to database");
        console.log(err);
        process.exit(1);
});
