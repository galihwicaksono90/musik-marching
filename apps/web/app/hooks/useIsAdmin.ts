"use client"
import { trpc } from "../trpc"

export const useIsAdmin = () => {
  const me = trpc.auth.me.useQuery()
  return me.data?.role.name === "ADMIN"
}
