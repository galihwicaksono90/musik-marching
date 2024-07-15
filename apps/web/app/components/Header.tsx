import { trpc } from "../trpc"

export function Header() {
  const me = trpc.auth.me.useQuery()

  if (!me.data) {
    return null
  }
  console.log({ me: me.data })

  return (
    <div>{me.data.email} - {me.data.role.name}</div>
  )
}

