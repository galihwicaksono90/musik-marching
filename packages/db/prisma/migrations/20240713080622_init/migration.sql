/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `ScoreType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ScoreTypeEnum" AS ENUM ('REGULAR', 'EXCLUSIVE');

-- AlterTable
ALTER TABLE "ScoreType" DROP COLUMN "name",
ADD COLUMN     "name" "ScoreTypeEnum" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ScoreType_name_key" ON "ScoreType"("name");
