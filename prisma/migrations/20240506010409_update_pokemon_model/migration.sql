/*
  Warnings:

  - You are about to drop the column `baseExperience` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `isOwnedByUser` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "baseExperience",
ADD COLUMN     "isOwnedByUser" BOOLEAN NOT NULL;
