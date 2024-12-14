import express, { Request, Response } from "express";
import * as service from "../../services/passions.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const passions = await service.getPassions();

    res.status(200).send(passions);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
