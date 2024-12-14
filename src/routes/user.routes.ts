import express from "express";
import usersRoutes from "../controllers/user/users.controller";
import tasksRoutes from "../controllers/user/tasks.controller";
import passionsRoutes from "../controllers/user/passions.controller";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/tasks", tasksRoutes);
router.use("/passions", passionsRoutes);

export default router;
