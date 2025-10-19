import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const registerUser = async (req, reply) => {
  const { email, password } = req.body;

  console.log(`request `, email);
  console.log(`request `, password);


  if (!email || !password) {
    return reply.status(400).send({ message: "Email and password are required" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return reply.status(409).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    reply.status(201).send({ message: "User registered successfully", user: { id: newUser.id, email: newUser.email } });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Server error" });
  }
};
