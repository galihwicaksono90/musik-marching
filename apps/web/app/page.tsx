'use client'
import { trpc } from "./trpc"
import { Button } from "@repo/ui/components/ui/button"
import { CreateScoreForm } from "./components/CreateScoreForm"
import { Header } from "./components/Header"
import { useIsAdmin } from "./hooks/useIsAdmin"

export default function Home() {
  const isAdmin = useIsAdmin()
  const scores = trpc.score.getVerifiedScores.useQuery(undefined, {
    initialData: [],
    enabled: isAdmin
  })

  const utils = trpc.useUtils()

  const verifyScore = trpc.score.verifyScore.useMutation()

  const verify = async (scoreId: string) => {
    await verifyScore.mutateAsync({
      scoreId
    })
    utils.score.getAllScores.invalidate()
  }
  const refetch = () => {
    console.log("hello")
    scores.refetch()
  }

  return (
    <div className="flex flex-col gap-8 p-12">
      <div>
        <a href="http://localhost:4000/oauth2/google/callback">
          <Button >
            Login
          </Button>
        </a>
        <Header />
      </div>
      <CreateScoreForm />
      <ul className="flex flex-col gap-2">
        {scores.data.map(score => (
          <li key={score.id} className="flex flex-col">
            <p>{score.title}</p>
            <p>{score.uploadedBy.name}</p>
            <p>{score.type.name}</p>
            {
              score.verifiedAt
                ? <p>Verified</p>
                : <Button onClick={() => verify(score.id)}>Verify</Button>
            }
          </li>
        ))}
      </ul>
      <Button onClick={refetch} >refresh</Button>
    </div >
  );
}


