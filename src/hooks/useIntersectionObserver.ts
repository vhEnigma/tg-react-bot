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
      console.log(entry.target, 'entry.target')
      callback(observer)
      setObserver(observer)
      observer.unobserve(entry.target)
    }
  }, {
    rootMargin: '50px 0 0 0'
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
