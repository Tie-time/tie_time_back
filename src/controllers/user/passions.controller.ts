import express, { Request, Response } from "express";
import * as passionService from "../../services/passions.service";
import * as passionCheckedByservice from "../../services/passionsCheckedBy.service";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { RoleEnum } from "../../enums/RoleEnum";
import { PassionsFilter } from "../../types/passions/filters/passions.filter";
import { getDateWithoutTime } from "../../helpers/date/date.helpers";
import { User } from "../../models/User";
import { PassionCheckedBy } from "../../models/PassionCheckedBy";

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

      const passions =
        await passionService.getMyPassionsWithCheckedStatusByDate(
          userConnected.id,
          formattedDate
        );

      res.status(200).send(passions);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.post(
  "/:id/check",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const query = req.query;
      if (!query.date) {
        throw new Error("Date manquante");
      }

      const passionsFilter: PassionsFilter = {
        date: new Date(query.date as string),
      };

      const formattedDate: Date = getDateWithoutTime(passionsFilter.date);

      const userConnected = req.userConnected as User;
      const passion = await passionService.getPassionById(parseInt(id, 10));

      if (passion === null) {
        throw new Error("Passion non trouvée");
      }

      // get passion checked by date and user
      const passionCheckedBy =
        await passionCheckedByservice.getPassionCheckedByDateUserAndPassion(
          userConnected.id,
          formattedDate,
          passion.id
        );

      //Passion already checked
      if (passionCheckedBy !== null) {
        await passionCheckedByservice.deletePassionCheckedBy(
          passionCheckedBy.id
        );
        console.log("Uncheckd");
        res.status(200).send({ success: "Passion mise à jour avec succès" });
        return;
      }

      const newPassionCheckedBy = new PassionCheckedBy();
      newPassionCheckedBy.checked_by = userConnected;
      newPassionCheckedBy.date = formattedDate;
      newPassionCheckedBy.passion = passion;

      await passionCheckedByservice.addPassionCheckedBy(newPassionCheckedBy);
      console.log("Checked");
      res.status(201).send({ success: "Passion mise à jour avec succès" });
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

export default router;
