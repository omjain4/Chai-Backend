// require("dotenv").config(path: './env');

import dotenv from "dotenv";
import express from "express";
import mongoose, { connect } from "mongoose";
import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
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
