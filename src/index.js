//  require("dotenv").config();


import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/index.js";
import { app } from "./app.js";
import {v2 as cloudinary} from "cloudinary"
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

connectDB()
.then(() => {
    app.on("error", (err) => {
        console.log("Error in server setup", err);
        throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
});
// import express from "express";
// const app = express();
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.
//             MONGODB_URL}/${DB_NAME}`)
//             app.on("error", (err) => {
//                 console.log("Error in server setup", err);
//                throw err;
//             })
           
//             app.listen(process.env.PORT, () => {
//                console.log(`Server is listeing on port ${process.env.PORT}`);
//             });

//         }catch (error) {
//           console.log("Connected to MongoDB", error);
//           throw err;
//     }
// })()
