'use client'
import { useForm, Controller } from "react-hook-form"
import { RouterInputs } from "@repo/server"
import { Input } from "@repo/ui/components/ui/input"
import { Button } from "@repo/ui/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"
import { scoreTypes } from "@repo/server/schemas/score"
import { trpc } from "../trpc"

type Inputs = RouterInputs["score"]["create"]

export function CreateScoreForm() {
  const createScore = trpc.score.create.useMutation()
  const { register, handleSubmit, control } = useForm<Inputs>()
  const utils = trpc.useUtils()

  const onSubmit = async (inputs: Inputs) => {
    console.log({ inputs })
    const res = await createScore.mutateAsync(inputs)
    console.log({ res })
    await utils.score.getScores.invalidate()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="text" placeholder="title" {...register("title")} />
      <Input type="text" placeholder="author" {...register("author")} />
      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                {scoreTypes.map(type => (
                  <SelectItem value={type} key={type}>{type}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit">Submit</Button>
    </form>
  )
}

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
