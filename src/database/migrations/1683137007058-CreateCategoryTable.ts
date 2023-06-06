import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { CATEGORIES } from "../../constants/DBTable";

export class CreateCategoryTable1683137007058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: CATEGORIES,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
            isNullable: true,
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CATEGORIES);
  }
}
