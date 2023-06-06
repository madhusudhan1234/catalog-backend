import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { USERS } from "../../constants/DBTable";
import { Roles } from "../../constants/Role";

export class CreateUserTable1685727650663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: USERS,
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "role",
            type: "int",
            default: Roles.USER,
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
    await queryRunner.dropTable(USERS);
  }
}
