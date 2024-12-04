import express from "express";
import rolesRoutes from "../controllers/admin/roles.controller";
import usersRoutes from "../controllers/admin/users.controller";
import tasksRoutes from "../controllers/admin/tasks.controller";
import passionsRoutes from "../controllers/admin/passions.controller";

const router = express.Router();

router.use("/roles", rolesRoutes);
router.use("/users", usersRoutes);
router.use("/tasks", tasksRoutes);
router.use("/passions", passionsRoutes);

export default router;
