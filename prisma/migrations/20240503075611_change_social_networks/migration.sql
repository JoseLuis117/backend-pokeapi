-- DropForeignKey
ALTER TABLE "SocialNetwork" DROP CONSTRAINT "SocialNetwork_userId_fkey";

-- AlterTable
ALTER TABLE "SocialNetwork" ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SocialNetwork" ADD CONSTRAINT "SocialNetwork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
