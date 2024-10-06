import express from "express";
import usersRoutes from "../controllers/user/users.controller";

const router = express.Router();

router.use("/users", usersRoutes);

export default router;
