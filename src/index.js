import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({ path: '/.env' })

 connectDB()
 .then(()=>{

    app.listen(process.env.PORT,()=>{
        console.log(`\n 🟢 Server is running on http://localhost:${process.env.PORT}`);
    }) 

 })
 .catch((error)=>{
    console.log("❗ DB Connection Error:",error);
 })