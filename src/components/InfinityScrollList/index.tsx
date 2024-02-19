import { ReactNode, useEffect, useState } from 'react'
import useInfinityScroll from '../../hooks/useInfinityScroll'
import { PAGE_SIZE } from '../../constants/common'
import { IParams } from '../../types/params'

type InfinityScrollListProps<T> = {
  renderItems: (props: RenderItemsProps<T>) => ReactNode
  request: (params: IParams) => Promise<T[]>
  enabled: boolean
}

export type RenderItemsProps<T> = {
  dataList: T[]
  ref: (node?: Element | null | undefined) => void
  isFetchingNextPage: boolean
}

const InfinityScrollList = <T extends Record<string, string | number>>({ enabled, renderItems, request }: InfinityScrollListProps<T>) => {
  const { ref, inView, setStopInfinityScroll, downloadedPages, setDownloadedPages, isFetchingNextPage } = useInfinityScroll()
  const [dataList, setDataList] = useState<T[]>([])

  const fetchWrapper = async () => {
    const response = await request({ page: downloadedPages })
    setDataList((prev) => [...prev, ...response])
    if (response.length < PAGE_SIZE) {
      setStopInfinityScroll(true)
    }

    setDownloadedPages(downloadedPages + 1)
  }

  useEffect(() => {
    if (enabled) {
      fetchWrapper()
    }
  }, [])

  useEffect(() => {
    if (isFetchingNextPage && enabled) {
      fetchWrapper()
    }
  }, [inView])

  const props: RenderItemsProps<T> = {
    dataList,
    ref,
    isFetchingNextPage
  }

  return renderItems(props)
}

export default InfinityScrollList
