/*
  Warnings:

  - You are about to drop the column `pokemonId` on the `types` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "types" DROP CONSTRAINT "types_pokemonId_fkey";

-- AlterTable
ALTER TABLE "types" DROP COLUMN "pokemonId";

-- CreateTable
CREATE TABLE "_PokemonTotypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonTotypes_AB_unique" ON "_PokemonTotypes"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonTotypes_B_index" ON "_PokemonTotypes"("B");

-- AddForeignKey
ALTER TABLE "_PokemonTotypes" ADD CONSTRAINT "_PokemonTotypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonTotypes" ADD CONSTRAINT "_PokemonTotypes_B_fkey" FOREIGN KEY ("B") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
