import { registerUser } from "../controllers/userController.js";

async function userRoutes(fastify, options) {
  fastify.post("/register", registerUser);
}

export default userRoutes;
