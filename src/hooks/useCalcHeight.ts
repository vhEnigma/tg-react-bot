import {NAVIGATION_HEIGHT} from "../constants/style.ts";
import {useEffect, useRef, useState} from "react";

const useCalcHeight = () => {
    const [loaderWrapperHeight, setLoaderWrapperHeight] = useState('100%')
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (wrapperRef.current) {
            const height = `calc(100vh - ${wrapperRef.current.clientHeight}px - ${NAVIGATION_HEIGHT})`
            setLoaderWrapperHeight(height)
        }
    }, [wrapperRef.current]);
    console.log(loaderWrapperHeight, 'fuck')
    return {
        wrapperRef,
        loaderWrapperHeight
    }
}

export  default useCalcHeight