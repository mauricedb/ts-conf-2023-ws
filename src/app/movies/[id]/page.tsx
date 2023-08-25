import React, { FC } from 'react'

import { MovieForm } from '@/components/movie-form'
import { prisma } from '@/lib/db'
import { saveMovie } from '@/server/save-movie'

type Props = {
  params: {
    id: string
  }
}

const MoviePage: FC<Props> = async (props) => {
  const movie = await prisma.movie.findFirstOrThrow({
    where: { id: +props.params.id },
  })

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Movie details for: {movie.title}
      </h2>

      <MovieForm initialMovie={movie} saveMovie={saveMovie} />
    </main>
  )
}

export default MoviePage
