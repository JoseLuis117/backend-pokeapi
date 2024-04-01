/*
  Warnings:

  - Added the required column `favouritePokemon` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favouritePokemon" TEXT NOT NULL,
ADD COLUMN     "regionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Regiones" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Regiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "xp" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "specialAttack" INTEGER NOT NULL,
    "specialDefense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "baseExperience" INTEGER NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "pokemonId" INTEGER,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PokemonToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonToUser_AB_unique" ON "_PokemonToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonToUser_B_index" ON "_PokemonToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Regiones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types" ADD CONSTRAINT "types_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToUser" ADD CONSTRAINT "_PokemonToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToUser" ADD CONSTRAINT "_PokemonToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
