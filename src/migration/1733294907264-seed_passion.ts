import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPassion1733294907264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- Seed Data 
              INSERT INTO passion (label, icon_path) VALUES
              ('gaming', '/icons/game_controller.svg'),
              ('cooking', '/icons/game_controller.svg'),
              ('gardening', '/icons/game_controller.svg'),
              ('board-gaming', '/icons/game_controller.svg'),
              ('painting', '/icons/game_controller.svg'),
              ('music', '/icons/game_controller.svg'),
              ('reading', '/icons/game_controller.svg'),
              ('sport', '/icons/game_controller.svg'),
              ('movie', '/icons/game_controller.svg');
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
