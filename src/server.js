import Fastify from "fastify";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import fastifyCors from "@fastify/cors";

dotenv.config();

const fastify = Fastify({ logger: true });

// habilitar CORS para o frontend
await fastify.register(fastifyCors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

// Rotas
fastify.register(userRoutes, { prefix: "/api/" });

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
