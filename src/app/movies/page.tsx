import { ComponentProps } from 'react'
import Link from 'next/link'
import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { MovieCard } from '@/components/movie-card'

type MovieRequiredForCard = ComponentProps<typeof MovieCard>['movie']
const take = 8

async function getMovies(
  page: number,
  genreId?: string,
): Promise<MovieRequiredForCard[]> {
  const select = {
    id: true,
    title: true,
    overview: true,
    backdrop_path: true,
    vote_average: true,
    vote_count: true,
  } satisfies Prisma.MovieSelect

  const orderBy: Prisma.MovieOrderByWithRelationInput = {
    vote_average: 'desc',
  } as const

  if (genreId) {
    const genre = await prisma.genre.findFirst({
      where: { id: +genreId },
      include: {
        movies: {
          select,
          orderBy,
        },
      },
    })

    return genre?.movies ?? []
  } else {
    const skip = (page - 1) * take

    const movies = await prisma.movie.findMany({
      select,
      skip,
      take,
      orderBy,
    })

    return movies
  }
}

type Props = {
  searchParams: {
    genre?: string
    page?: string
  }
}

export default async function MoviesPage({ searchParams }: Props) {
  const page = searchParams.page ? +searchParams.page : 1
  const movies = await getMovies(page, searchParams.genre)
  const hasMore = !searchParams.genre && movies.length === take
  const topMovie = movies[0]

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Movies</h2>
      <p className="p-6 text-center font-bold">
        The top rated movie here is: &quot;{topMovie.title}&quot;.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {movies.map((movie, index) => {
          return <MovieCard key={movie.id} movie={movie} />
        })}
      </div>
      {!searchParams.genre ? (
        <div className="flex justify-center gap-2">
          <Button asChild={page > 1} disabled={page <= 1}>
            {page > 1 ? (
              <Link
                href={{
                  query: {
                    page: page - 1,
                  },
                }}
              >
                &lt;
              </Link>
            ) : (
              <>&lt;</>
            )}
          </Button>
          <Button asChild={hasMore} disabled={!hasMore}>
            {hasMore ? (
              <Link
                href={{
                  query: {
                    page: page + 1,
                  },
                }}
              >
                &gt;
              </Link>
            ) : (
              <>&gt;</>
            )}
          </Button>
        </div>
      ) : null}
    </main>
  )
}
