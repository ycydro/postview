import { Separator } from "@/components/ui/separator"
import GoogleLogin from "@/features/auth/components/GoogleSignIn"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-md animate-[fade-in_0.5s_ease-in-out] flex-col items-center space-y-6.5">
        {/* Title and subtitle */}
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-semibold">Welcome to Postview</h1>
          <p className="text-sm text-muted-foreground">
            Sign in with google to continue.
          </p>
        </div>

        <div className="w-full px-10">
          <GoogleLogin />
        </div>
        <Link
          className="flex items-center justify-center gap-2 text-xs"
          href={"/"}
        >
          <p className="hover:underline">Back</p>
        </Link>
      </div>
    </main>
  )
}
