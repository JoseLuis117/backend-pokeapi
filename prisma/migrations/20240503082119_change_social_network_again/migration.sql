/*
  Warnings:

  - Made the column `userId` on table `SocialNetwork` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SocialNetwork" DROP CONSTRAINT "SocialNetwork_userId_fkey";

-- AlterTable
ALTER TABLE "SocialNetwork" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SocialNetwork" ADD CONSTRAINT "SocialNetwork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
