import {
  Geist_Mono,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google"

// @ts-ignore: Allow importing global CSS without type declarations
import "./globals.css"
import { cn } from "@/lib/utils"

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "grain antialiased",
        fontMono.variable,
        fontSans.variable,
        fontSerif.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}
