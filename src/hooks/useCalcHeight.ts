import {NAVIGATION_HEIGHT} from "../constants/style.ts";
import {useEffect, useRef, useState} from "react";

const useCalcHeight = () => {
    const [loaderWrapperHeight, setLoaderWrapperHeight] = useState('100%')
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (wrapperRef.current) {
            const height = wrapperRef.current.clientHeight
            const style = `calc(100vh - ${height}px - ${NAVIGATION_HEIGHT})`
            console.log(height, style)
            setLoaderWrapperHeight(style)
        }
    }, [wrapperRef.current]);
    console.log(loaderWrapperHeight, 'fuck')
    return {
        wrapperRef,
        loaderWrapperHeight
    }
}

export  default useCalcHeight