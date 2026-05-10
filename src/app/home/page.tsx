import { Button } from "@/components/ui/button"
import { getUser } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import signOutAction from "./actions"

export default async function Page() {
  const user = await getUser()

  if (!user) {
    redirect("/auth/sign-in")
  }

  return (
    <div className="flex min-h-svh flex-col gap-2 p-6">
      Hello {user.name}!
      <form action={signOutAction}>
        <Button size="lg">Sign out</Button>
      </form>
    </div>
  )
}
