import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { SUBSCRIBERS } from "../../constants/DBTable";

export class CreateSubscribersTable1683385522457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: SUBSCRIBERS,
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "country",
            type: "varchar",
          },
          {
            name: "phone",
            type: "varchar",
          },
          {
            name: "message",
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
    await queryRunner.dropTable(SUBSCRIBERS);
  }
}
