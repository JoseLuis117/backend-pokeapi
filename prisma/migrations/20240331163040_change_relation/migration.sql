/*
  Warnings:

  - You are about to drop the `_PokemonToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PokemonToUser" DROP CONSTRAINT "_PokemonToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PokemonToUser" DROP CONSTRAINT "_PokemonToUser_B_fkey";

-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PokemonToUser";

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
