import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { PAGE_SIZE } from '../../constants/common'
import { IParams } from '../../types/params'
import { MenuItemType } from '../../types/menuList'
import { TabsType } from '../../pages/SingleDirection/constants'
import { CustomRef } from '../MenuList'

type InfinityScrollListProps<T> = {
  renderItems: (props: RenderItemsProps<T>) => ReactNode
  request: (params: IParams) => Promise<T[]>
  enabled: boolean
  requestId?: string
  activeTab?: TabsType
  fetchRef: MutableRefObject<CustomRef | undefined>
}

export type RenderItemsProps<T> = {
  dataList: T[]
  ref: (node?: Element | null | undefined) => void
}

function useFirstRender() {
  const ref = useRef(true)
  const firstRender = ref.current
  ref.current = false
  return firstRender
}

const InfinityScrollList = <T extends MenuItemType>({
  requestId,
  activeTab,
  renderItems,
  request,
  enabled,
  fetchRef
}: InfinityScrollListProps<T>) => {
  const { ref } = useInView({
    threshold: 0
  })
  const [isStopInfinityScroll, setStopInfinityScroll] = useState(false)
  const [downloadedPages, setDownloadedPages] = useState(1)
  // const isFetchingNextPage = inView && !isStopInfinityScroll
  const [dataList, setDataList] = useState<T[]>([])
  const infinityTriggerDiv = useRef<HTMLDivElement | null>(null)
  const isFirstRender = useFirstRender()

  const fetchWrapper = useCallback(
    async (page?: number) => {
      const fuckingPage = page || downloadedPages
      console.log('fetch func')
      const params: IParams = { page: fuckingPage }
      if (requestId) params.id = requestId
      const response = await request(params)
      setDataList((prev) => [...prev, ...response])
      if (response.length < PAGE_SIZE) {
        setStopInfinityScroll(true)
      } else {
        setDownloadedPages(fuckingPage + 1)
      }
    },
    [downloadedPages, request]
  )

  useEffect(() => {
    fetchRef.current = {
      fetchWrapper,
      setDownloadedPages
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStopInfinityScroll && enabled) {
          console.log('isIntersecting')
          fetchWrapper()
        }
      },
      { threshold: 0 }
    )

    if (infinityTriggerDiv.current) {
      observer.observe(infinityTriggerDiv.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [fetchWrapper])

  useEffect(() => {
    setDownloadedPages(1)
    setDataList([])
    setStopInfinityScroll(false)
    if (!enabled) return
    console.log('fetch 2')

    fetchWrapper(1)
  }, [activeTab])

  const props: RenderItemsProps<T> = {
    dataList,
    ref
  }

  return (
    <>
      {renderItems(props)}
      {!isFirstRender && !isStopInfinityScroll && <div ref={infinityTriggerDiv} />}
    </>
  )
}

export default InfinityScrollList
