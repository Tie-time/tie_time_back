import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPassion1733294907264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- Seed Data 
              INSERT INTO passion (label, icon_url) VALUES
              ('gaming', 'http://localhost:5001/icons/game_controller.svg'),
              ('cooking', 'http://localhost:5001/icons/game_controller.svg'),
              ('gardening', 'http://localhost:5001/icons/game_controller.svg'),
              ('board-gaming', 'http://localhost:5001/icons/game_controller.svg'),
              ('painting', 'http://localhost:5001/icons/game_controller.svg'),
              ('music', 'http://localhost:5001/icons/game_controller.svg'),
              ('reading', 'http://localhost:5001/icons/game_controller.svg'),
              ('sport', 'http://localhost:5001/icons/game_controller.svg'),
              ('movie', 'http://localhost:5001/icons/game_controller.svg');
              `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- Revert Seed Data 
              DELETE FROM passion WHERE label IN ('gaming', 'cooking', 'gardening', 'board-gaming', 'painting', 'music', 'reading', 'sport', 'movie');
              `
    );
  }
}
