import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { IMAGES, IMAGE_PRODUCT, PRODUCTS } from "../../constants/DBTable";

export class CreateImageProductTable1684517262211
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: IMAGE_PRODUCT,
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "imageId",
            type: "integer",
          },
          {
            name: "productId",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      IMAGE_PRODUCT,
      new TableForeignKey({
        columnNames: ["imageId"],
        referencedColumnNames: ["id"],
        referencedTableName: IMAGES,
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      IMAGE_PRODUCT,
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["id"],
        referencedTableName: PRODUCTS,
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(IMAGE_PRODUCT);
  }
}
