'use client'
import { ScoreList } from "./components/ScoreList"
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { trpc } from "./trpc";

export default function Home() {
  const me = trpc.auth.me.useQuery()
  return (
    <div>
      <pre>{me.data?.name} - {me.data?.role.name}</pre>
      <Link href="http://localhost:4000/oauth2/google/callback">
        <Button>login</Button>
      </Link>
      <ScoreList />
    </div>
  );
}


