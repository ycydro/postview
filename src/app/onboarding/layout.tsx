import { getUser } from "@/lib/auth/session"
import { redirect } from "next/navigation"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect("/auth/sign-in")
  } else if (user.isOnboarded) {
    redirect("/home")
  }

  return <>{children}</>
}
