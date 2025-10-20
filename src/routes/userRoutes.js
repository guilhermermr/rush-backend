import { registerUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";

async function userRoutes(fastify, options) {
    fastify.post("/register", registerUser);

    fastify.post("/login", loginUser);


}

export default userRoutes;
