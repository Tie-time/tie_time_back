import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import adminRouter from "./routes/admin.routes";
import userRouter from "./routes/user.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import { RoleEnum } from "./enums/RoleEnum";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5001;

// Configuration des fichiers statiques
app.use(express.static("public"));

// Montez les routes des utilisateurs et des conversations sur votre application
app.use("/admin/api", authMiddleware({ roles: [RoleEnum.ADMIN] }), adminRouter);
app.use("/api", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: "Something went wrong", error: err.message });
});

async function bootstrap(): Promise<void> {
  try {
    // Connexion à la base de donnée (Attente de la connexion avant de passer à la suite)
    await AppDataSource.initialize().then(async () => {
      console.info("DB connected!");
      // Synchronize the database schema
      await AppDataSource.synchronize();
      console.info("Schema synchronized!");

      // Run migrations
      await AppDataSource.runMigrations();
      console.info("Migrations passed!");

      // Start Express server
      const server = app.listen(port, () => {
        console.info(`Server is running on http://localhost:${port}`);
      });
    });
  } catch (error) {
    console.log("DB connexion failed");
    console.log(error);
  }
}

// Call the bootstrap function to start the application
bootstrap();
