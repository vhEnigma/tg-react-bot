import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react'
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

  const fetchWrapper = async (page: number) => {
    console.log('fetch func')
    const params: IParams = { page }
    if (requestId) params.id = requestId
    const response = await request(params)
    setDataList((prev) => [...prev, ...response])
    if (response.length < PAGE_SIZE) {
      setStopInfinityScroll(true)
    } else {
      setDownloadedPages(downloadedPages + 1)
    }
  }

  useEffect(() => {
    console.log('start fetch')
    fetchWrapper(downloadedPages)
    fetchRef.current = {
      fetchWrapper,
      setDownloadedPages
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStopInfinityScroll && enabled) {
          console.log('isIntersecting')
          fetchWrapper(downloadedPages)
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
  }, [])

  useEffect(() => {
    if (activeTab) {
      setDownloadedPages(1)
      setDataList([])
      setStopInfinityScroll(false)
      if (!enabled) return
      console.log('fetch 2')

      fetchWrapper(1)
    }
  }, [activeTab])

  // useEffect(() => {
  //   if (isFetchingNextPage) {
  //     setDownloadedPages(downloadedPages + 1)
  //   }
  // }, [isFetchingNextPage])

  // useEffect(() => {
  //   console.log(downloadedPages, 'downloadedPages')
  //   if (isFetchingNextPage) {
  //     if (!enabled) return
  //     console.log('fetch 3')
  //     fetchWrapper(downloadedPages)
  //   }
  // }, [downloadedPages])

  const props: RenderItemsProps<T> = {
    dataList,
    ref
  }

  return (
    <>
      {renderItems(props)}
      {!isStopInfinityScroll && <div ref={infinityTriggerDiv} />}
    </>
  )
}

export default InfinityScrollList
