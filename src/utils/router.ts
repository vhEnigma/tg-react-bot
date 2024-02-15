import {RouteList} from "../routes/routes.ts";

export const getActiveRoute = (pathname: string) => {
    const valuesMap:Record<string, number> = {
        [RouteList.Root]: 0,
        [RouteList.Directions]: 1,
        [RouteList.Technology]: 2,
    }
    const key = valuesMap[pathname.slice(1)]

    return key || RouteList.Root
}