import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const useInfinityScroll = () => {
  const { ref, inView } = useInView({
    threshold: 0
  })
  const [isStopInfinityScroll, setStopInfinityScroll] = useState(false)
  const [downloadedPages, setDownloadedPages] = useState(1)
  const isFetchingNextPage = inView && !isStopInfinityScroll

  return {
    isFetchingNextPage,
    ref,
    inView,
    isStopInfinityScroll,
    setStopInfinityScroll,
    downloadedPages,
    setDownloadedPages
  }
}

export default useInfinityScroll
