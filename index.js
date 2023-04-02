import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//database config
import dbConfig from "./src/config/database.js";

//routes
import authRoutes from "./src/routes/authRoutes.js";

const app = express();

dbConfig();
dotenv.config({ path: ".env" });

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);

app.get("/check",(req,res)=>{
   res.send("Hello World!");
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
