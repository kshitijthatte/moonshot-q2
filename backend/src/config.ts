import dotenv from "dotenv";

dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET,
  mongodbUri: process.env.MONGODB_URI,
};

const validateConfig = () => {
  if (!config.jwtSecret) {
    throw new Error("Missing environment variable: JWT_SECRET");
  }
  if (!config.mongodbUri) {
    throw new Error("Missing environment variable: MONGODB_URI");
  }
};

validateConfig();

export default config;
