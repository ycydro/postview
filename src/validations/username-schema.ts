import * as z from "zod"

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be a least 3 characters.")
    .max(16, "Username is limited to only 16 characters."),
})

export type UsernameData = z.infer<typeof usernameSchema>
