import { ReactNode, useEffect, useState } from 'react'
import useInfinityScroll from '../../hooks/useInfinityScroll'
import { PAGE_SIZE } from '../../constants/common'
import { IParams } from '../../types/params'
import { MenuItemType } from '../../types/menuList'
import { TabsType } from '../../pages/SingleDirection/constants'

type InfinityScrollListProps<T> = {
  renderItems: (props: RenderItemsProps<T>) => ReactNode
  request: (params: IParams) => Promise<T[]>
  enabled: boolean
  requestId?: string
  activeTab?: TabsType
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
  enabled
}: InfinityScrollListProps<T>) => {
  const { ref, setStopInfinityScroll, downloadedPages, isFetchingNextPage, setDownloadedPages } = useInfinityScroll()
  const [dataList, setDataList] = useState<T[]>([])

  const fetchWrapper = async (page: number) => {
    const params: IParams = { page }
    if (requestId) params.id = requestId
    const response = await request(params)
    setDataList((prev) => [...prev, ...response])
    if (response.length < PAGE_SIZE) {
      setStopInfinityScroll(true)
    }
  }

  useEffect(() => {
    if (!activeTab) {
      console.log('start fetch')
      fetchWrapper(downloadedPages)
    }
  }, [])

  useEffect(() => {
    if (isFetchingNextPage && enabled) {
      console.log('increase page')
      setDownloadedPages(downloadedPages + 1)
    }
  }, [isFetchingNextPage])

  useEffect(() => {
    if (activeTab) {
      setDownloadedPages(1)
      setDataList([])
      setStopInfinityScroll(false)
      fetchWrapper(1)
      console.log('switch tab')
    }
  }, [activeTab])

  useEffect(() => {
    console.log(downloadedPages, 'page', isFetchingNextPage, 'isFetchingNextPage')
    if (isFetchingNextPage) {
      console.log('fetch pages')
      fetchWrapper(downloadedPages)
    }
  }, [downloadedPages])

  const props: RenderItemsProps<T> = {
    dataList,
    ref
  }

  return renderItems(props)
}

export default InfinityScrollList
