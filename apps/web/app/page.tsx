'use client'
import Link from "next/link"
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { trpc } from "./trpc"

export default function Home() {
  // const hello = trpc.user.embuh.useQuery()
  // const users = trpc.user.all.useQuery()
  const me = trpc.auth.me.useQuery()

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <a href="http://localhost:4000/oauth2/google/callback">Login</a>
      {/* <Button variant="outline" onClick={async () => users.refetch}>hello</Button> */}
      <pre>
        {JSON.stringify(me.data, null, 4)}</pre>
    </div>
  );
}
