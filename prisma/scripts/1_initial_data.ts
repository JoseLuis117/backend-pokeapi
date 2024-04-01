import { PrismaClient } from "@prisma/client";
async function main() {
    const prisma = new PrismaClient();
    const tipos = [
        "FIGHTING", "FLYING", "POISON", "GROUND", "ROCK", "BUG", "GHOST",
        "STEEL", "FIRE", "WATER", "GRASS", "ELECTRIC", "PSYCHIC", "ICE",
        "DRAGON", "DARK", "FAIRY", "UNKNOWN", "SHADOW"
    ];
    const tiposObjects = tipos.map(nombre => ({ nombre: nombre }));

    await prisma.types.createMany({
        data: tiposObjects
    });
    const regionsArray = [
        { nombre: "KANTO" },
        { nombre: "JOHTO" },
        { nombre: "HOENN" },
        { nombre: "SINNOH" },
        { nombre: "UNOVA" },
        { nombre: "KALOS" },
        { nombre: "ALOLA" },
        { nombre: "GALAR" },
        { nombre: "HISUI" },
        { nombre: "PALDEA" }
      ];
            
    await prisma.regiones.createMany({
        data: regionsArray
    });
}
main()