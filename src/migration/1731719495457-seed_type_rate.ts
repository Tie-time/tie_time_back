import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedTypeRate1731719495457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- Seed Data 
            INSERT INTO type_rate (label, out_of) VALUES
            ('self-estime', 5),
            ('satisfaction', 5);
            `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- Revert Seed Data 
            DELETE FROM role WHERE label IN ('self-estime', 'satisfaction');
            `
    );
  }
}
