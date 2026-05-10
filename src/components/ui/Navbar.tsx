"use client"

import { Button } from "./button"
import Link from "next/link"

const Navbar = () => {
  return (
    <header>
      <nav className="relative container mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display text-xl tracking-tight">Postview</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="rounded-full px-5 text-sm font-semibold"
          >
            <Link href="/auth/sign-in">Get started</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
