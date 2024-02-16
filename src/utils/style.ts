import {NAVIGATION_HEIGHT} from "../constants/style.ts";

export const calcLoaderWrapperHeight = () => {
    return `calc(100% - ${NAVIGATION_HEIGHT}px)`
}