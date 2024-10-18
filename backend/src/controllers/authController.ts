import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import config from "../config";

export const signup = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).send("Cannot find user");
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(401).send("Invalid credentials");
      return;
    }
    const accessToken = jwt.sign({ id: user._id }, config.jwtSecret);
    res.json({ accessToken });
  } catch {
    res.status(500).send("Error during login");
  }
};
