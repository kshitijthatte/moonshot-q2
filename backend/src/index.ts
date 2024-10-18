import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import authRoutes from "./routes/auth";
import chartRoutes from "./routes/chart";
import dataRoutes from "./routes/data";
import trendRoutes from "./routes/trend";
import { loadData } from "./utils/loadData";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(config.mongodbUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
  });

loadData();

app.use("/api", authRoutes);
app.use("/api", chartRoutes);
app.use("/api", dataRoutes);
app.use('/api', trendRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
