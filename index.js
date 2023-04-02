import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//routes
import authRoutes from "./src/routes/authRoutes.js";

const app = express();

dotenv.config({ path: ".env" });

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
