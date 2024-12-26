import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedTypeRate1731719495457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- Seed Data 
            INSERT INTO type_rate (code, label, out_of) VALUES
            ('self-esteem', 'Éstime de soi', 5),
            ('satisfaction', 'Satisfaction', 5);
            `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- Revert Seed Data 
            DELETE FROM type_rate WHERE code IN ('self-esteem', 'satisfaction');
            `
    );
  }
}
