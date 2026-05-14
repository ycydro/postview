type FetcherOptions = RequestInit & {
  body?: unknown
  next?: NextFetchRequestConfig
}

export async function fetcher<T>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<T> {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const url = `${BASE_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    let errorMessage = "Something went wrong"

    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch {
      // ignore json parsing error
    }

    throw new Error(errorMessage)
  }

  return response.json()
}
