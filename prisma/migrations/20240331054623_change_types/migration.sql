-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_regionId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "favouritePokemon" DROP NOT NULL,
ALTER COLUMN "regionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Regiones"("id") ON DELETE SET NULL ON UPDATE CASCADE;
