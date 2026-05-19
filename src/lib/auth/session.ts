"use server"

import { headers } from "next/headers"
import { auth } from "."
import { db } from "@/lib/db"

export async function getUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) return null

  return db.user.findUnique({
    where: { id: session.user.id },
  })
}
