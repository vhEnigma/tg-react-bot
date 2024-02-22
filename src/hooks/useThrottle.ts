import { useState } from 'react'

// eslint-disable-next-line
const useThrottle = <T extends any>(callback: (...args: any[]) => T, delay: number) => {
  const [isThrottled, setIsThrottled] = useState(false)
  // eslint-disable-next-line
  const throttledFunction = (...args: any[]) => {
    if (!isThrottled) {
      setIsThrottled(true)
      console.log(args, 'args')
      callback(...args)

      setTimeout(() => {
        setIsThrottled(false)
      }, delay)
    }
  }

  return throttledFunction
}

export default useThrottle
