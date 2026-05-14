import type { Movie } from "@/app/generated/prisma/client"

import { getUser } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { fetcher } from "@/lib/fetcher"

import MovieList from "@/components/MovieList"

export default async function Page() {
  const user = await getUser()

  if (!user) {
    redirect("/auth/sign-in")
  }

  const { movies: initialMovies } = await fetcher<any>("/api/movies", {
    cache: "force-cache",
  })

  return (
    <div className="flex min-h-svh flex-col gap-2 p-6">
      <MovieList initialMovies={initialMovies} />
    </div>
  )
}
