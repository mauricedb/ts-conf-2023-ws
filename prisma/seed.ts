import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import movies from './movies.json'
import genres from './genres.json'

async function main() {
  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { id: genre.id },
      update: genre,
      create: genre,
    })
  }

  for (const item of movies) {
    const { genre_ids, ...rest } = item
    const movie = {
      ...rest,
      genres: {
        connect: genre_ids.map((id) => ({ id })),
      },
    }

    await prisma.movie.upsert({
      where: { id: movie.id },
      update: movie,
      create: movie,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
