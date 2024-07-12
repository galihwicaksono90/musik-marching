'use client'
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { trpc } from "./trpc"

export default function Home() {
  const hello = trpc.hello.useQuery()
  const refetch = () => {
    hello.refetch()
  }

  if (hello.isLoading) {
    return (
      <div>
        Loadingg....
      </div>
    )
  }
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Button variant="outline" onClick={refetch}>hello</Button>
      {hello.data}
      <Input />
    </div>
  );
}
