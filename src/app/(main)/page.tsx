import { getUser } from "@/lib/auth/session"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getUser()

  if (user) redirect("/home")

  return <div className="flex min-h-svh flex-col gap-2 p-6"></div>
}
