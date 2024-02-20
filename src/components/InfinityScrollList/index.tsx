import { ReactNode, useEffect, useState } from 'react'
import useInfinityScroll from '../../hooks/useInfinityScroll'
import { PAGE_SIZE } from '../../constants/common'
import { IParams } from '../../types/params'
import { MenuItemType } from '../../types/menuList'
import { TabsType } from '../../pages/SingleDirection/types'

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
  enabled,
  requestId,
  activeTab,
  renderItems,
  request
}: InfinityScrollListProps<T>) => {
  const { ref, setStopInfinityScroll, downloadedPages, setDownloadedPages, isFetchingNextPage } = useInfinityScroll()
  const [dataList, setDataList] = useState<T[]>([])

  const fetchWrapper = async () => {
    console.log('request', downloadedPages, 'pages')
    const params: IParams = { page: downloadedPages }
    if (requestId) params.id = requestId
    const response = await request(params)
    setDataList((prev) => [...prev, ...response])
    if (response.length < PAGE_SIZE) {
      setStopInfinityScroll(true)
    }

    setDownloadedPages(downloadedPages + 1)
  }

  useEffect(() => {
    console.log(activeTab, 'ACTIVETAB')
    if (activeTab) {
      setDownloadedPages(0)
      setDataList([])
      fetchWrapper()
    }
  }, [activeTab])

  useEffect(() => {
    console.log(enabled, 'enabled')
    if (enabled && !activeTab) {
      fetchWrapper()
    }
  }, [enabled])

  useEffect(() => {
    console.log(isFetchingNextPage && enabled, 'isFetchingNextPage && enabled')
    if (isFetchingNextPage && enabled) {
      fetchWrapper()
    }
  }, [isFetchingNextPage, enabled, activeTab])

  const props: RenderItemsProps<T> = {
    dataList,
    ref
  }

  return renderItems(props)
}

export default InfinityScrollList
