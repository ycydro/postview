import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { getUser } from "@/lib/auth/session"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  return (
    <>
      <Navbar user={user} />
      <div className="mx-auto max-w-6xl min-w-0 space-y-2.5 overflow-x-hidden">
        {children}
      </div>
      <Footer />
    </>
  )
}
