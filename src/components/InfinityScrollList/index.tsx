import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { PAGE_SIZE } from '../../constants/common'
import { IParams, QueryParamsType } from '../../types/params'
import { MenuItemType } from '../../types/menuList'
import { TabsType } from '../../pages/SingleDirection/constants'
import { CustomRef } from '../MenuList'
import useFirstRender from '../../hooks/useFirstRender'
import Loader from '../Loader'

type InfinityScrollListProps<T> = {
  renderItems: (props: RenderItemsProps<T>) => ReactNode
  request: (params: IParams) => Promise<T[]>
  enabled: boolean
  queryParams?: QueryParamsType
  activeTab?: TabsType
  fetchRef: MutableRefObject<CustomRef | undefined>
}

export type RenderItemsProps<T> = {
  dataList: T[]
}

const InfinityScrollList = <T extends MenuItemType>({
  activeTab,
  renderItems,
  request,
  enabled,
  fetchRef,
  queryParams
}: InfinityScrollListProps<T>) => {
  const [isStopInfinityScroll, setStopInfinityScroll] = useState(false)
  const [downloadedPages, setDownloadedPages] = useState(1)
  const [dataList, setDataList] = useState<T[]>([])
  const infinityTriggerDiv = useRef<HTMLDivElement | null>(null)
  const isFirstRender = useFirstRender()
  const [isLoading, setLoading] = useState(false)

  const fetchWrapper = useCallback(
    async (page?: number) => {
      const fuckingPage = page || downloadedPages
      const params: IParams = { page: fuckingPage }

      if (queryParams) {
        const { to, from, requestId } = queryParams

        if (requestId) params.id = requestId
        if (from && to) {
          params.date_to = to
          params.date_from = from
        }
      }

      const response = await request(params)
      setDataList((prev) => [...prev, ...response])

      if (response.length < PAGE_SIZE) {
        setStopInfinityScroll(true)
      } else {
        setDownloadedPages(fuckingPage + 1)
      }
    },
    [downloadedPages, request, queryParams?.requestId]
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
  }, [fetchWrapper, queryParams?.requestId])

  useEffect(() => {
    const fetch = async () => {
      if (!enabled) return
      setLoading(true)
      setDownloadedPages(1)
      setDataList([])
      setStopInfinityScroll(false)
      await fetchWrapper(1)
      setLoading(true)
    }

    fetch()
  }, [activeTab, queryParams?.requestId])

  const props: RenderItemsProps<T> = {
    dataList
  }

  return (
    <>
      {isLoading ? <Loader /> : renderItems(props)}
      {!isFirstRender && !isStopInfinityScroll && <div ref={infinityTriggerDiv} />}
    </>
  )
}

export default InfinityScrollList
