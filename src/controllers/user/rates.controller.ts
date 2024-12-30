import express, { Request, Response } from "express";
import * as typeRateService from "../../services/typeRate.service";
import * as rateService from "../../services/rate.service";
import { RoleEnum } from "../../enums/RoleEnum";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { User } from "../../models/User";
import { getDateWithoutTime } from "../../helpers/date/date.helpers";
import { RatesFilter } from "../../types/rates/filters/rates.filter";
import { HttpError } from "../../errors/HttpError";

const router = express.Router();

router.post(
  "/",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const rateData = req.body;

      const userConnected = req.userConnected as User;

      const formattedDate: Date = getDateWithoutTime(new Date(rateData.date));
      const typeRate = await typeRateService.getTypeRateById(
        rateData.type_rate
      );

      rateData.created_by = userConnected;
      rateData.date = formattedDate.toISOString();
      rateData.type_rate = typeRate;

      const rateCreated = await rateService.createRate(rateData);
      res
        .status(201)
        .send({ success: "Note créée avec succès", rate: rateCreated });
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.get(
  "/",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const query = req.query;

      if (!query.date) {
        throw new HttpError(500, "Date manquante");
      }

      const ratesFilter: RatesFilter = {
        date: new Date(query.date as string),
      };

      const formattedDate: Date = getDateWithoutTime(ratesFilter.date);

      const userConnected = req.userConnected as User;

      const rates = await typeRateService.getMyRateWithScoreByDate(
        userConnected.id,
        formattedDate
      );

      res.status(200).send(rates);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.put(
  "/:id",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const possibleFields = ["score"];
      const fields = Object.keys(req.body);
      const isValidOperation = fields.every((field) =>
        possibleFields.includes(field)
      );

      if (!isValidOperation) {
        throw new Error(
          `Champs invalides, les champs possible sont: ${possibleFields.join(
            ", "
          )}`
        );
      }

      const rateData = req.body;

      const userConnected = req.userConnected as User;

      const rate = await rateService.getMyRateById(userConnected, id);

      if (!rate) {
        throw new HttpError(404, "Note non trouvée");
      }

      const rateUpdated = await rateService.updateRate(id, rateData);

      if (!rateUpdated) {
        throw new HttpError(500, "Erreur lors de la mise à jour de la note");
      }

      res.status(200).send({ success: "Note mise à jour avec succès" });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).send({ error: error.message });
    }
  }
);

export default router;
