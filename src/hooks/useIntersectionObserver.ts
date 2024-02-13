import { useEffect, RefObject } from 'react'

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


const useInfinityObserver = (elementRef: RefObject<HTMLElement>, callback: () => void) => {

  const infinityObserver = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      callback()
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


}

export default useInfinityObserver
