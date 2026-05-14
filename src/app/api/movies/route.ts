import { TMDB_API_OPTIONS } from "@/lib/tmdb"
import { NextRequest, NextResponse } from "next/server"

const BASE_API_URL = process.env.TMDB_API_BASE_URL!

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const search = searchParams.get("search")?.trim()

    const endpoint = search
      ? `search/movie?query=${search}`
      : "discover/movie?sort_by=popularity.desc"

    console.log(endpoint, "ENDPOINT")

    const response = await fetch(
      `${BASE_API_URL}/${endpoint}`,
      TMDB_API_OPTIONS
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: true, message: "Failed to fetch movies" },
        { status: 500 }
      )
    }

    const { results: movies } = await response.json()

    // return NextResponse.json({
    //   query: searchParams.get("search"),
    //   page: searchParams.get("page"),
    // })

    return NextResponse.json({ success: true, movies })
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Failed to fetch movies" },
      { status: 500 }
    )
  }
}
