'use client'
import { Button } from "@repo/ui/components/ui/button"
import { trpc } from "../trpc"
import { useIsAdmin } from "../hooks/useIsAdmin"

export function AllScoreList() {
  const isAdmin = useIsAdmin()
  const utils = trpc.useUtils()
  const scores = trpc.score.getAllScores.useQuery(undefined, {
    enabled: isAdmin
  })

  const verifyScore = trpc.score.verifyScore.useMutation()

  const onVerify = async (scoreId: string) => {
    await verifyScore.mutateAsync({
      scoreId: scoreId
    })
    utils.score.getVerifiedScores.invalidate()
    utils.score.getAllScores.invalidate()
  }

  return (
    <div>
      {isAdmin ?
        <ul>
          {
            scores.data?.map(score => (
              <li key={score.id}>
                <div>
                  {score.title}
                  {score.verifiedAt ?
                    null
                    :
                    <Button onClick={() => onVerify(score.id)}> verify</Button>
                  }
                </div>
              </li>
            ))
          }
        </ul >
        : null
      }
    </div>
  )
}
