import { useEffect } from 'react'

type useScrollFetchingProps = {
  isSearchMode: boolean
  setFetching: (status: boolean) => void
}

export const useScrollFetching = (props: useScrollFetchingProps) => {

  const { isSearchMode, setFetching } = props

  const onScroll = (event: Event) => {
    const target = event.target as Document
    const fullHeightWithScroll = target.documentElement.scrollHeight
    const scrollFromTop = target.documentElement.scrollTop
    const visiblePart = window.innerHeight

    const isBottomPage = visiblePart + scrollFromTop >= fullHeightWithScroll

    if (isBottomPage && !isSearchMode) {
      setFetching(true)
    }

  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}