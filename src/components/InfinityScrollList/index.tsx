import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { PAGE_SIZE } from '../../constants/common'
import { IParams } from '../../types/params'
import { MenuItemType } from '../../types/menuList'
import { TabsType } from '../../pages/SingleDirection/constants'
import { CustomRef } from '../MenuList'
import useFirstRender from '../../hooks/useFirstRender'

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
}

const InfinityScrollList = <T extends MenuItemType>({
  requestId,
  activeTab,
  renderItems,
  request,
  enabled,
  fetchRef
}: InfinityScrollListProps<T>) => {
  const [isStopInfinityScroll, setStopInfinityScroll] = useState(false)
  const [downloadedPages, setDownloadedPages] = useState(1)
  const [dataList, setDataList] = useState<T[]>([])
  const infinityTriggerDiv = useRef<HTMLDivElement | null>(null)
  const isFirstRender = useFirstRender()

  const fetchWrapper = useCallback(
    async (page?: number) => {
      const fuckingPage = page || downloadedPages
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
    if (!enabled) return
    setDownloadedPages(1)
    setDataList([])
    setStopInfinityScroll(false)

    fetchWrapper(1)
  }, [activeTab])

  const props: RenderItemsProps<T> = {
    dataList
  }

  return (
    <>
      {renderItems(props)}
      {!isFirstRender && !isStopInfinityScroll && <div ref={infinityTriggerDiv} />}
    </>
  )
}

export default InfinityScrollList
