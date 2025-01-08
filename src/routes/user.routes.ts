import express from "express";
import usersRoutes from "../controllers/user/users.controller";
import tasksRoutes from "../controllers/user/tasks.controller";
import passionsRoutes from "../controllers/user/passions.controller";
import ratesRoutes from "../controllers/user/rates.controller";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/tasks", tasksRoutes);
router.use("/passions", passionsRoutes);
router.use("/rates", ratesRoutes);

export default router;
