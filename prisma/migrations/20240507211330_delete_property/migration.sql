-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_cartId_fkey";

-- AlterTable
ALTER TABLE "Pokemon" ALTER COLUMN "cartId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
