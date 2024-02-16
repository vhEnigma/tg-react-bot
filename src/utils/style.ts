import {NAVIGATION_HEIGHT} from "../constants/style.ts";

export const calcLoaderWrapperHeight = (height:number) => {
    return `calc(100% - ${NAVIGATION_HEIGHT}px - ${height}px)`
}