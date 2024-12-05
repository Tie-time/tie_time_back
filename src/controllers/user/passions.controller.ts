import express, { Request, Response } from "express";
import * as service from "../../services/passions.service";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { RoleEnum } from "../../enums/RoleEnum";
import { PassionsFilter } from "../../types/passions/filters/passions.filter";
import { getDateWithoutTime } from "../../helpers/date/date.helpers";
import { User } from "../../models/User";

const router = express.Router();

router.get(
  "/",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const query = req.query;

      if (!query.date) {
        throw new Error("Date manquante");
      }

      const passionsFilter: PassionsFilter = {
        date: new Date(query.date as string),
      };

      const formattedDate: Date = getDateWithoutTime(passionsFilter.date);

      const userConnected = req.userConnected as User;

      const passions = await service.getMyPassionsWithCheckedStatusByDate(
        userConnected.id,
        formattedDate
      );

      res.status(200).send(passions);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

export default router;
