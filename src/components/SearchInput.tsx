import type { Dispatch, SetStateAction } from "react"
import { Input } from "./ui/input"
import { Loader, LucideSearch, X } from "lucide-react"
import { Button } from "./ui/button"

type SearchInputProps = {
  searchTerm: string
  placeholder?: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  onSubmit: () => void
  loading: boolean
}

const SearchInput = ({
  searchTerm,
  placeholder = "Search...",
  setSearchTerm,
  onSubmit,
  loading,
}: SearchInputProps) => {
  const hasInput = searchTerm && searchTerm.trim() !== ""

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!hasInput) return

    onSubmit()
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <LucideSearch className="size-4.5 text-muted-foreground" />
        </span>
        <Input
          type="text"
          disabled={loading}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md pr-3 pl-10"
        />
        {hasInput && (
          <span
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
            onClick={() => setSearchTerm("")}
          >
            <X className="size-4.5 text-muted-foreground duration-150 ease-in-out hover:text-red-300" />
          </span>
        )}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? <Loader className="animate-spin" /> : "Search"}
      </Button>
    </form>
  )
}

export default SearchInput
