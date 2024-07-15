import { RoleNameEnum } from "@repo/db"
import { trpc } from "../trpc"

export const useIsAdmin = () => {
  const me = trpc.auth.me.useQuery()
  return me.data?.role.name === RoleNameEnum.ADMIN
}
