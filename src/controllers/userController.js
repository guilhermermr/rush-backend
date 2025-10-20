import { PrismaClient } from "@prisma/client";
import UserModel from "../models/userModels.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const registerUser = async (req, reply) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return reply.status(400).send({ message: "Email and password are required" });
  }

  try {
    const existingUser = await UserModel.userExists(prisma, email);
    if (existingUser) {
      return reply.status(409).send({ message: "User already exists" });
    }

    const newUser = await UserModel.createUser(prisma, email, password);

    reply.status(201).send({ message: "User registered successfully", user: { id: newUser.id, email: newUser.email } });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Server error" });
  }
};

export const loginUser = async (req, reply) => {
  const { email, password } = req.body;


  try {
    const existingUser = await UserModel.userExists(prisma, email);


    if (!existingUser) {
      return reply.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    

  console.log('isPasswordValid:', isPasswordValid);

    if (!isPasswordValid) {
      return reply.status(401).send({ message: "Invalid password" });
    }

    reply.status(200).send({
      message: "Login successful",
      user: {
        id: existingUser.id,
        email: existingUser.email,
      },
    });
  } catch (error) {
    req.log.error(error);
    reply.status(500).send({ message: "Server error" });
  }
};
