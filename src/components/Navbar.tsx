"use client"
import Link from "next/link"
import { User } from "better-auth"
import { Button } from "./ui/button"
import { signOut } from "@/lib/auth/client"
import { useRouter } from "next/navigation"

type NavbarProps = {
  user: User | null
}

const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter()

  async function handleLogout() {
    await signOut()
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-999 border-b bg-background/75 backdrop-blur">
      <nav className="mx-auto flex h-12 w-full items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-sans text-xl tracking-tight">Postview</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!user && (
            <Button
              asChild
              size="sm"
              className="rounded-full px-5 text-sm font-semibold"
            >
              <Link href="/auth/sign-in">Get started</Link>
            </Button>
          )}

          {user && (
            <Button
              size="sm"
              onClick={handleLogout}
              className="rounded-full px-5 text-sm font-semibold"
            >
              Sign out
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
