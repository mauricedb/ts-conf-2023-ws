'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Movie } from '@prisma/client'

type Props = {
  movie: Pick<
    Movie,
    'id' | 'title' | 'overview' | 'backdrop_path' | 'vote_average'
  >
}

export const MovieCard = ({ movie }: Props) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
        <CardDescription>Vote average: {movie.vote_average}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="Poster"
            width={300}
            height={200}
            className="h-auto w-full object-contain pb-6"
          />
        </div>
        <p className="line-clamp-5">{movie.overview}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link">
          <Link href={`/movies/${movie.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
