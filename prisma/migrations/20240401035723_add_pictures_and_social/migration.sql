-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bannerPicture" TEXT,
ADD COLUMN     "profilePicture" TEXT;

-- CreateTable
CREATE TABLE "SocialNetwork" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SocialNetwork_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialNetwork" ADD CONSTRAINT "SocialNetwork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
