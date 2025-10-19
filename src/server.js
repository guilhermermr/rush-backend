import Fastify from "fastify";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({ logger: true });

// Rotas
fastify.register(userRoutes, { prefix: "/api/users" });

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT });
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
