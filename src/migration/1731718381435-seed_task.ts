import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedTask1731718381435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- Seed Data
            INSERT INTO task (id, is_checked, date, \`order\`, createdById, title, created_at, updated_at) VALUES
            (UUID(), 1, '2024-11-13 00:00:00', 2, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Faire les courses', '2024-11-14 07:02:39.032801', '2024-11-14 07:09:13.000000'),
            (UUID(), 1, '2024-11-13 00:00:00', 1, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Laver le linge', '2024-11-14 06:54:47.950575', '2024-11-14 17:52:25.000000'),
            (UUID(), 0, '2024-11-07 00:00:00', 1, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Faire les courses', '2024-11-07 06:21:49.232046', '2024-11-13 18:10:49.000000'),
            (UUID(), 1, '2024-11-13 00:00:00', 3, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Arroser les plantes', '2024-11-14 07:04:20.103321', '2024-11-14 07:09:08.000000'),
            (UUID(), 1, '2024-11-13 00:00:00', 4, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Nourrir le chien', '2024-11-14 07:09:19.365835', '2024-11-14 07:09:21.000000'),
            (UUID(), 0, '2024-11-07 00:00:00', 4, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Sortir les poubelles', '2024-11-14 05:59:57.301530', '2024-11-14 05:59:57.301530'),
            (UUID(), 0, '2024-10-25 00:00:00', 3, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Faire la vaisselle', '2024-10-25 09:25:11.356147', '2024-10-25 09:25:11.356147'),
            (UUID(), 1, '2024-11-07 00:00:00', 2, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Faire la vaisselle', '2024-11-07 06:21:55.035463', '2024-11-14 17:20:41.000000'),
            (UUID(), 1, '2024-11-07 00:00:00', 3, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Devenir développeur', '2024-11-07 06:22:00.326999', '2024-11-14 17:20:42.000000'),
            (UUID(), 1, '2024-10-25 00:00:00', 1, '268b1c99-86d5-11ef-affd-0242ac1c0002', 'Faire la cuisine', '2024-10-25 08:28:00.549079', '2024-11-13 06:18:52.000000');
            `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `-- Revert Seed Data
            DELETE FROM task WHERE createdById = '268b1c99-86d5-11ef-affd-0242ac1c0002';
            `
    );
  }
}
