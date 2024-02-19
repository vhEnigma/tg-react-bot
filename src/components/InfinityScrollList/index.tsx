import { ReactNode, useEffect, useState } from 'react'
import useInfinityScroll from '../../hooks/useInfinityScroll'
import { PAGE_SIZE } from '../../constants/common'
import { IParams } from '../../types/params'

type InfinityScrollListProps<T> = {
  renderItems: (props: RenderItemsProps<T>) => ReactNode
  request: (params: IParams) => Promise<T[]>
}

export type RenderItemsProps<T> = {
  dataList: T[]
  ref: (node?: Element | null | undefined) => void
  inView: boolean
  isStopInfinityScroll: boolean
}

const InfinityScrollList = <T extends Record<string, string | number>>({ renderItems, request }: InfinityScrollListProps<T>) => {
  const { ref, inView, setStopInfinityScroll, isStopInfinityScroll, downloadedPages, setDownloadedPages } = useInfinityScroll()
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
    fetchWrapper()
  }, [])

  useEffect(() => {
    if (inView && !isStopInfinityScroll) {
      fetchWrapper()
    }
  }, [inView])

  const props: RenderItemsProps<T> = {
    dataList,
    ref,
    inView,
    isStopInfinityScroll
  }

  return renderItems(props)
}

export default InfinityScrollList
