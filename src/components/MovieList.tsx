"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Movie } from "@/app/generated/prisma/client"
import MovieCard from "./MovieCard"

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

import { LucideSearch } from "lucide-react"
import useDebounceText from "@/hooks/use-debounce-text"
import { BaseUIEvent } from "@base-ui/react"
import { useIsMobile } from "@/hooks/use-is-mobile"

type MovieListProps = {
  initialMovies: Movie[] | null
}

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500"

const MovieList = ({ initialMovies }: MovieListProps) => {
  const [movies, setMovies] = useState<Movie[] | null>(initialMovies)
  const [suggestedMovies, setSuggestedMovies] = useState<Movie[] | null>(null)
  const [openCardId, setOpenCardId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const isMobile = useIsMobile()
  const debouncedSearchTerm = useDebounceText(searchTerm, 999)

  const handleEnterSearch = (event: any) => {
    if (
      event.key === "Enter" &&
      suggestedMovies &&
      suggestedMovies.length > 0
    ) {
      event.preventDefault()
      setMovies(suggestedMovies)
      setSearchTerm("")
      setSuggestedMovies([])
    }
  }

  const handleSearch = async (term: string) => {
    if (!term.trim() || term.length < 3) {
      setSuggestedMovies([])
      return
    }

    try {
      const response = await fetch(
        `/api/movies?search=${encodeURIComponent(term)}`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch movies")
      }

      const { movies } = await response.json()
      setSuggestedMovies(movies)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm])

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
    <section className="space-y-3">
      <Combobox
        items={suggestedMovies ?? []}
        onOpenChange={(open) => {
          if (!open) {
            setSuggestedMovies([])
            setSearchTerm("")
          }
        }}
      >
        <div className="relative w-full">
          <LucideSearch
            size={20}
            className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground"
          />
          <ComboboxInput
            className="rounded-none py-5 pl-7"
            placeholder="Search for movies..."
            value={searchTerm}
            showTrigger={false}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={handleEnterSearch}
          />
        </div>
        <ComboboxContent
          className="z-2 min-w-full rounded-none backdrop-blur-sm"
          sideOffset={10}
        >
          <ComboboxList className="bg-background/20">
            {suggestedMovies && suggestedMovies.length > 0 && !isMobile && (
              <div className="px-3 py-2 text-center text-sm text-muted-foreground">
                'Enter' to populate the movie list
              </div>
            )}

            {suggestedMovies?.map((item) => {
              const imageSource = item.poster_path
                ? `${BASE_IMG_URL}${item.poster_path}`
                : "/no-poster.png"

              return (
                <ComboboxItem
                  key={item.id}
                  value={item.title}
                  className="rounded-none bg-inherit"
                >
                  <div className="flex w-full items-center gap-2">
                    <Image
                      width={40}
                      height={70}
                      className="h-fit"
                      src={imageSource}
                      alt={item.title}
                    />
                    <div className="ml-1">
                      <p className="truncate">{item.title ?? "No title"}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.release_date).getFullYear() ?? ""}
                      </p>
                    </div>
                  </div>
                </ComboboxItem>
              )
            })}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <List />
    </section>
  )
}

export default MovieList
