import {NAVIGATION_HEIGHT} from "../constants/style.ts";
import { useRef, useState} from "react";

const useCalcHeight = () => {
    const [loaderWrapperHeight, setLoaderWrapperHeight] = useState('')
    const wrapperRef = useRef<HTMLDivElement>(null)

    const callbackRef = (div:HTMLDivElement) => {
        const height = div.clientHeight
        const style = `calc(100vh - ${height}px - ${NAVIGATION_HEIGHT}px)`
        console.log(height, style)
        setLoaderWrapperHeight(style)
    }

    // useEffect(() => {
    //     if (wrapperRef.current) {
    //         const height = wrapperRef.current.clientHeight
    //         const style = `calc(100vh - ${height}px - ${NAVIGATION_HEIGHT})`
    //         console.log(height, style)
    //         setLoaderWrapperHeight(style)
    //     }
    // }, []);
    console.log(loaderWrapperHeight, 'fuck')
    return {
        wrapperRef,
        loaderWrapperHeight,
        callbackRef
    }
}

export  default useCalcHeight