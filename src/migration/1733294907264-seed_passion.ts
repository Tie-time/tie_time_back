import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPassion1733294907264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- Seed Data 
              INSERT INTO passion (label, icon_path) VALUES
              ('gaming', '/icons/game_controller.svg'),
              ('cooking', '/icons/cook.svg'),
              ('gardening', '/icons/leaf.svg'),
              ('board-gaming', '/icons/dice.svg'),
              ('painting', '/icons/paint.svg'),
              ('music', '/icons/music.svg'),
              ('reading', '/icons/book.svg'),
              ('sport', '/icons/dribble.svg'),
              ('movie', '/icons/cinema.svg');
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
