'use client'
import { useState } from "react"
import { trpc } from "../trpc"
import { Input } from "@repo/ui/components/ui/input"
import { sortOptions, scoreTypes } from "@repo/server/schemas/score"
import { useDebounce } from "../hooks/useDebounce"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"
import { Button } from "@repo/ui/components/ui/button"

export const ScoreList = () => {
  const [title, setTitle] = useState<string>("")
  const [orderBy, setOrderBy] = useState<typeof sortOptions[number]>("asc")
  const [type, setType] = useState<typeof scoreTypes[number]>()
  const [page, setPage] = useState<number>(1)
  const debouncedTitle = useDebounce(title, 500)
  const purchaseScore = trpc.purchase.purchaseScore.useMutation()
  const utils = trpc.useUtils()

  const onPurchase = async (scoreId: string) => {
    await purchaseScore.mutateAsync({
      scoreId
    })
    utils.score.getVerifiedScores.invalidate()
  }

  const scores = trpc.score.getVerifiedScores.useQuery({
    title: debouncedTitle,
    orderBy: orderBy,
    limit: 7,
    includePageCount: true,
    page,
    type,
  })

  const search = () => {
    scores.refetch()
  }

  const onNext = () => {
    setPage(o => o + 1)
  }

  const onPrev = () => {
    setPage(o => {
      if (o > 1) {
        return o - 1
      }
      return o
    })
  }


  return (
    <div>
      <p>{page}</p>
      <Input onChange={o => setTitle(o.target.value)} />
      <Select onValueChange={(value: typeof sortOptions[number]) => setOrderBy(value)} value={orderBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Type</SelectLabel>
            {sortOptions.map(option => (
              <SelectItem value={option} key={option}>{option}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value: typeof scoreTypes[number]) => setType(value)} value={orderBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Type</SelectLabel>
            {scoreTypes.map(option => (
              <SelectItem value={option} key={option}>{option}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={search}>Serch</Button>
      <ul>
        {scores.data?.pagination.map(s => (
          <div className="flex flex-row" key={s.id}>
            <li>
              <div>{s.title} - {new Date(s.uploadedAt).getHours()}</div>
              <Button onClick={() => onPurchase(s.id)}>Purchase</Button>
            </li>
          </div>
        ))}
      </ul>
      <div className="flex flex-row">
        <Button onClick={onPrev} disabled={scores.data?.meta.isFirstPage}>Prev</Button>
        <Button onClick={onNext} disabled={scores.data?.meta.isLastPage}>Next</Button>
      </div>
    </div>
  )
}
