import { useEffect, useState } from "react"

const useDebounceText = (text: string, delay: number) => {
  const [debounced, setDebounced] = useState("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(text)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay])

  return debounced
}

export default useDebounceText
