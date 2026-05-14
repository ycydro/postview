"use client"

import { Movie } from "@/app/generated/prisma/client"
import MovieCard from "./MovieCard"
import { Suspense, useEffect, useState } from "react"
import SearchInput from "./SeachInput"
import useDebounce from "@/hooks/use-debounce"

type MovieListProps = {
  initialMovies: Movie[] | null
}

const MovieList = ({ initialMovies }: MovieListProps) => {
  const [movies, setMovies] = useState<Movie[] | null>(initialMovies)
  const [openCardId, setOpenCardId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(
        `/api/movies?search=${encodeURIComponent(searchTerm)}`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch movies")
      }

      const { movies } = await response.json()
      setMovies(movies)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setSearchTerm("")
    }
  }

  const List = () => {
    if (movies && movies.length === 0) {
      return (
        <div className="w-full py-8 text-center">No movies have been found</div>
      )
    }
    return (
      <div className="grid max-h-fit w-full auto-rows-fr grid-cols-2 place-items-center gap-2 overflow-y-auto md:grid-cols-5">
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => (
            <div key={movie.id} className="h-full min-h-0 overflow-hidden">
              <MovieCard
                movie={movie}
                isOpen={openCardId === movie.id}
                onOpenChange={() =>
                  setOpenCardId(openCardId === movie.id ? null : movie.id)
                }
              />
            </div>
          ))}
      </div>
    )
  }

  return (
    <>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmit={handleSearch}
        loading={isLoading}
      />
      <List />
    </>
  )
}

export default MovieList
