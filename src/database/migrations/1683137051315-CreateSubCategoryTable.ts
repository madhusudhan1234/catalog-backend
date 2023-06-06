import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { CATEGORIES, SUBCATEGORIES } from "../../constants/DBTable";

export class CreateSubCategoryTable1683137051315 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: SUBCATEGORIES,
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
            name: "categoryId",
            type: "uuid",
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

    await queryRunner.createForeignKey(
      SUBCATEGORIES,
      new TableForeignKey({
        columnNames: ["categoryId"],
        referencedColumnNames: ["id"],
        referencedTableName: CATEGORIES,
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey(SUBCATEGORIES, "categoryId");
    await queryRunner.dropTable(SUBCATEGORIES);
  }
}
