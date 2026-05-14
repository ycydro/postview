"use client"

import { Movie } from "@/app/generated/prisma/client"
import Image from "next/image"
import { Plus, Star, Play, Info, MoreHorizontal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

type MovieCardProps = {
  movie: Movie
  isOpen: boolean
  onOpenChange: () => void
}

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500"

const MovieCard = ({ movie, isOpen, onOpenChange }: MovieCardProps) => {
  const imageSource = movie.poster_path
    ? `${BASE_IMG_URL}${movie.poster_path}`
    : "/no-poster.png"

  return (
    <>
      {/* Desktop View - hidden on mobile */}
      <div className="group relative hidden overflow-hidden rounded-lg transition-all duration-300 ease-out hover:shadow-2xl md:block">
        <Image
          src={imageSource}
          alt={movie.title}
          priority
          width={500}
          height={500}
          className="min-h-full min-w-full rounded-lg object-cover transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/50 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

        <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="space-y-2">
            <h3 className="line-clamp-1 text-sm font-semibold text-primary">
              {movie.title}
            </h3>

            <div className="flex items-center justify-between gap-2">
              <Button
                size="icon"
                className="h-8 w-8 flex-1 rounded-full backdrop-blur-sm"
                aria-label="Add to list"
              >
                <Eye size={16} />
              </Button>
              <Button
                size="icon"
                className="h-8 w-8 flex-1 rounded-full backdrop-blur-sm"
                aria-label="Add to favorites"
              >
                <Star size={16} />
              </Button>
              <Button
                size="icon"
                className="h-8 w-8 flex-1 rounded-full backdrop-blur-sm"
                aria-label="More info"
              >
                <Info size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - visible only on mobile */}
      <div
        className="relative block overflow-hidden rounded-lg md:hidden"
        onClick={onOpenChange}
      >
        <Image
          src={imageSource}
          alt={movie.title}
          priority
          width={500}
          height={500}
          className="h-full w-full rounded-lg object-cover"
        />

        {/* Ellipsis button on top right */}
        <Button
          size="icon"
          className="absolute top-1.5 right-2 h-8 w-8 rounded-full bg-background/60 text-primary backdrop-blur-sm"
          aria-label="More options"
          onClick={onOpenChange}
        >
          <MoreHorizontal size={16} />
        </Button>

        {/* Bottom up overlay with animation */}
        <div
          className={`absolute inset-0 bg-linear-to-t from-background/90 via-background/50 to-transparent transition-all duration-500 ease-out ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={onOpenChange}
        >
          <div
            className={`absolute right-0 bottom-0 left-0 transform p-4 transition-transform duration-500 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              <h3 className="line-clamp-1 text-sm font-semibold text-primary">
                {movie.title}
              </h3>

              {/* Vertical buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  size="sm"
                  className="gap-2 backdrop-blur-sm"
                  aria-label="Add to list"
                >
                  <Eye size={16} />
                  Add to viewed
                </Button>
                <Button
                  size="sm"
                  className="gap-2 backdrop-blur-sm"
                  aria-label="Add to favorites"
                >
                  <Star size={16} />
                  Add to favorites
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-2 backdrop-blur-sm"
                  aria-label="More info"
                >
                  <Info size={16} />
                  More info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieCard
