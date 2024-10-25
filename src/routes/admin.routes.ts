import express from "express";
import rolesRoutes from "../controllers/admin/roles.controller";
import usersRoutes from "../controllers/admin/users.controller";
import tasksRoutes from "../controllers/admin/tasks.controller";

const router = express.Router();

router.use("/roles", rolesRoutes);
router.use("/users", usersRoutes);
router.use("/tasks", tasksRoutes);

export default router;
