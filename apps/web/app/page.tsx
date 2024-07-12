'use client'
import { trpc } from "./trpc"
import { Button } from "@repo/ui/components/ui/button"

export default function Home() {
  const me = trpc.auth.me.useQuery()
  const userScores = trpc.score.userUploads.useQuery(undefined, {
    enabled: !!me.data,
    initialData: []
  })

  return (
    <div className="flex flex-col">
      <a href="http://localhost:4000/oauth2/google/callback">Login</a>
      <Button>Click me!</Button>
      <pre>{JSON.stringify(me.data, null, 4)}</pre>
      <pre>{JSON.stringify(userScores.data, null, 4)}</pre>
    </div >
  );
}
