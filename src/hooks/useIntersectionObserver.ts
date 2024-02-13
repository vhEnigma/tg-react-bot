import {useEffect, RefObject, useState} from 'react'

// type IntersectionOptions = {
//   root?: Element | null;
//   rootMargin?: string;
//   threshold?: number | number[];
// }
//
// type IntersectionResult = {
//   entry: IntersectionObserverEntry | null;
//   observer: IntersectionObserver | null;
// }
//
// const defaultOptions: IntersectionOptions = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.5
// }


const useInfinityObserver = (elementRef: RefObject<HTMLElement>, callback: (observer:IntersectionObserver) => void) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)
  const infinityObserver = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      callback(observer)
      setObserver(observer)
      observer.unobserve(entry.target)
    }
  })

  useEffect(() => {
    const node = elementRef.current
    console.log(node, 'node')
    if (node) {
      infinityObserver.observe(node)
    }
  }, [elementRef.current])

  return observer
}

export default useInfinityObserver
