import { RouteList } from '../routes/routes'

export const getActiveRoute = (pathname: string) => {
  const valuesMap: Record<string, number> = {
    [RouteList.Root]: 0,
    [RouteList.Directions]: 1,
    [RouteList.Technology]: 2
  }

  const key = pathname.slice(1) || RouteList.Root

  return valuesMap[key]
}
