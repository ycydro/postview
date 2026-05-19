"use server"

import { User } from "@/app/generated/prisma/client"
import { getUser } from "@/lib/auth/session"
import { db } from "@/lib/db"
import { Result, type Result as ResultType } from "@/lib/result"
import { UsernameData, usernameSchema } from "@/validations/username-schema"

export async function createUsername(
  data: UsernameData
): Promise<ResultType<Pick<User, "username" | "name">>> {
  const user = await getUser()

  if (!user) return Result.fail("Unauthorized", "No user found")

  const result = usernameSchema.safeParse(data)

  if (!result.success)
    return Result.fail(result.error.message, result.error.message)

  const lowercasedUsername = data.username.toLowerCase()

  const existingUser = await db.user.findFirst({
    where: { username: lowercasedUsername },
  })

  if (existingUser)
    return Result.fail("Existing username", "Username already exists.")

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: { isOnboarded: true, username: lowercasedUsername },
  })

  return Result.ok(
    { username: updatedUser.username, name: updatedUser.name },
    "Username successfully added!"
  )
}
