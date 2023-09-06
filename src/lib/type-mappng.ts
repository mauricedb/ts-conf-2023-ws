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

// Taken from https://effectivetypescript.com/2022/02/25/gentips-4-display/
type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] }

type FinalStringPartsOfMovie = Resolve<FinalOnlyPropsOfType<Movie, string>>

const partOfMovie: FinalStringPartsOfMovie = {
  backdrop_path: '',
  overview: '',
  poster_path: '',
  release_date: '',
  title: '',
}

console.log(partOfMovie)

type CamelCase<S extends string> = S extends `${infer First}_${infer Rest}`
  ? `${Lowercase<First>}${Capitalize<CamelCase<Rest>>}`
  : Lowercase<S>

type CamelCaseProps<TObject extends Record<keyof any, unknown>> = {
  [Prop in keyof TObject as CamelCase<Prop & string>]: TObject[Prop]
}

type CamelCaseMovie = CamelCaseProps<Movie & { this_movie_is_popular: boolean }>

type Names = 'foo' | 'bar'
type Suffixes = 'Key' | 'Value'

type Pairs = `${Names}${Suffixes}`
