import { Movie } from "@/app/generated/prisma/client"

export function getMovieImage(movie: Movie) {
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500"

  const path = movie.poster_path
    ? `${BASE_IMG_URL}${movie.poster_path}`
    : "/no-poster.png"

  return path
}
