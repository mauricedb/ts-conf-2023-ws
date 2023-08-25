import { prisma } from '@/lib/db'
import { GenreSelector } from '@/components/genre-selector'

export async function GenreLoader() {
  const genres = await prisma.genre.findMany({
    orderBy: { name: 'asc' },
  })

  return <GenreSelector genres={genres} />
}
