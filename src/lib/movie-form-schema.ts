import * as z from 'zod'

export const movieFormSchema = z.object({
  id: z.number(),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  overview: z.string().min(1, {
    message: 'Overview is required.',
  }),
  release_date: z
    .string()
    .regex(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/, {
      message: 'Release date must be in format YYYY-MM-DD.',
    }),
  backdrop_path: z.string(),
  poster_path: z.string(),
  popularity: z.coerce.number().min(0, "Popularity can't be negative"),
  vote_average: z.coerce
    .number()
    .min(0, "Vote average can't be negative")
    .max(10, "Vote average can't be more than 10"),
  vote_count: z.coerce.number().min(0, "Vote count can't be negative"),
})
