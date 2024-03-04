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

const InfinityScrollList = <T extends MenuItemType>({ requestId, activeTab, renderItems, request }: InfinityScrollListProps<T>) => {
  const { ref, setStopInfinityScroll, downloadedPages, isFetchingNextPage, setDownloadedPages } = useInfinityScroll()
  const [dataList, setDataList] = useState<T[]>([])

  const fetchWrapper = async (page: number) => {
    const params: IParams = { page: downloadedPages }
    if (requestId) params.id = requestId
    const response = await request(params)
    setDataList((prev) => [...prev, ...response])
    if (response.length < PAGE_SIZE) {
      setStopInfinityScroll(true)
    } else {
      setDownloadedPages(page + 1)
    }
  }

  useEffect(() => {
    console.log('fetch')
    if (!activeTab) {
      fetchWrapper(1)
    }
  }, [])

  useEffect(() => {
    if (isFetchingNextPage) {
      fetchWrapper(downloadedPages)
    }
  }, [isFetchingNextPage])

  useEffect(() => {
    fetchWrapper(downloadedPages)
    console.log('fetch pages')
  }, [downloadedPages])

  useEffect(() => {
    if (activeTab) {
      setDownloadedPages(1)
      setDataList([])
      setStopInfinityScroll(false)
      console.log('fetch 1.5')
    }
  }, [activeTab])

  const props: RenderItemsProps<T> = {
    dataList,
    ref
  }

  return renderItems(props)
}

export default InfinityScrollList
