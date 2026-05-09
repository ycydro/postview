import { db } from "@/lib/db"

export default async function Page() {
  const posts = await db.post.findMany()

  return (
    <div className="flex min-h-svh flex-col gap-2 p-6">
      {posts.length > 0 && posts.map((post: any) => <div>{post.title}</div>)}
    </div>
  )
}
