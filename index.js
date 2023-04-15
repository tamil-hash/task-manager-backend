import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";

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
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);

app.get("/check",(req,res)=>{
   res.send("Hello World!");
})


app.all("*", (_, res) => {
  res.status(404).send("Unknown path! 404 not found!");
});


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
