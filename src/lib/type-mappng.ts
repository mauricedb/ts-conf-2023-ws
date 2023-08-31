import { Movie } from '@prisma/client'

type AllProps<TObject> = {
  [Prop in keyof TObject]: TObject[Prop]
}

type OnlyPropsOfTypeString<TObject> = {
  [Prop in keyof TObject as TObject[Prop] extends string
    ? Prop
    : never]: TObject[Prop]
}

type AllPropsOfAnObject<TObject extends Record<keyof any, unknown>> = {
  [Prop in keyof TObject]: TObject[Prop]
}

type CopyOfMovie = AllProps<Movie>
type StringPartsOfMovie = OnlyPropsOfTypeString<Movie>
type AllPropsOfMovie = AllPropsOfAnObject<Movie>
// @ts-expect-error
type AllPropsOfString = AllPropsOfAnObject<string>

type FinalOnlyPropsOfType<
  TObject extends Record<keyof any, unknown>,
  Target,
> = {
  [Prop in keyof TObject as TObject[Prop] extends Target
    ? Prop
    : never]: TObject[Prop]
}

type FinalStringPartsOfMovie = FinalOnlyPropsOfType<Movie, string>

const partOfMovie: FinalStringPartsOfMovie = {
  backdrop_path: '',
  overview: '',
  poster_path: '',
  release_date: '',
  title: '',
}

console.log(partOfMovie)
