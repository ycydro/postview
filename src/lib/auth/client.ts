import { createAuthClient } from "better-auth/react"

const authClient = createAuthClient()

export const signInWithGoogle = async () => {
  authClient.signIn.social({
    provider: "google",
    callbackURL: "/home",
  })
}

export const { signUp, signOut, useSession } = authClient
