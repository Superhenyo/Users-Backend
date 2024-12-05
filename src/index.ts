// src/index.ts
import express, { Express} from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import {connectToDatabase} from './config/sequelize';


import UserRouter from "./routes/Users"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

connectToDatabase()


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());


app.use("/Users", UserRouter)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;