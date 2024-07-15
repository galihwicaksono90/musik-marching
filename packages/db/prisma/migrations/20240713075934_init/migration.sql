/*
  Warnings:

  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleNameEnum" AS ENUM ('USER', 'CONTRIBUTOR', 'ADMIN');

-- DropIndex
DROP INDEX "Role_name_key";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "name",
ADD COLUMN     "name" "RoleNameEnum" NOT NULL;
