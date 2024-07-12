'use client'
import { CreateScoreForm } from "./components/CreateScoreForm"
import { trpc } from "./trpc"

export default function Home() {
  const uploads = trpc.score.userUploads.useQuery()
  return (
    <div className="flex flex-col">
      <CreateScoreForm />
      <pre>
        {JSON.stringify(uploads.data, null, 4)}
      </pre>
    </div >
  );
}
