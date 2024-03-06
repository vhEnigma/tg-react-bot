import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react'
import { Box, List } from '@mui/material'
import Search from '../Search'
import Loader from '../Loader'
import { IParams, QueryParamsType } from '../../types/params'
import useSearch from '../../hooks/useSearch'
import NotFound from '../NotFound'
import { calcLoaderWrapperHeight } from '../../utils/style'
import InfinityScrollList, { RenderItemsProps } from '../InfinityScrollList'
import { MenuItemType } from '../../types/menuList'
import { useTelegram } from '../../hooks/useTelegram'
import { TabsType } from '../../pages/SingleDirection/constants'
import useFirstRender from '../../hooks/useFirstRender'

type MenuListProps<T> = {
  request: (params: IParams) => Promise<T[]>
  getItems: (props: RenderItemsProps<T>) => ReactNode
  queryParams?: QueryParamsType
  activeTab?: TabsType
}

export type CustomRef = {
  fetchWrapper: (page: number) => Promise<void>
  setDownloadedPages: Dispatch<SetStateAction<number>>
}

const MenuList = <T extends MenuItemType>({ queryParams, activeTab, request, getItems }: MenuListProps<T>) => {
  const { searchList, setSearchList, setSearchValue, debouncedSearchValue, isSearch, setSearch, searchValue } = useSearch<T[]>()
  const { tg } = useTelegram()
  const fetchRef = useRef<CustomRef>()
  const isFirstRender = useFirstRender()

  useEffect(() => {
    if (activeTab) {
      setSearchList(null)
      setSearchValue('')
    }
  }, [activeTab, queryParams?.requestId])

  useEffect(() => {
    const findWrapper = async () => {
      if (isFirstRender) return
      if (debouncedSearchValue) {
        setSearch(true)
        const params: IParams = { q: debouncedSearchValue, pageSize: 1000 }
        if (queryParams?.requestId) params.id = queryParams.requestId

        const response = await request(params)
        setSearchList(response)
        setSearch(false)
      } else {
        fetchRef.current?.fetchWrapper(1)
        fetchRef.current?.setDownloadedPages(1)
        setSearchList(null)
      }
    }

    findWrapper()
  }, [debouncedSearchValue])

  const renderItems = (props: RenderItemsProps<T>) => {
    if (Array.isArray(searchList) && searchList.length === 0) {
      tg.HapticFeedback.notificationOccurred('error')
      return <NotFound />
    }
    const array = searchList || props.dataList

    return getItems({ ...props, dataList: array })
  }

  return (
    <>
      <Box sx={{ position: 'sticky', top: '-15px', zIndex: 1, borderRadius: '4px' }}>
        <Search value={searchValue} setValue={setSearchValue} />
      </Box>
      <Box sx={{ height: calcLoaderWrapperHeight(72) }}>
        {isSearch ? (
          <Loader />
        ) : (
          <List sx={{ height: '100%' }} component='div' aria-label='secondary mailbox folder'>
            <InfinityScrollList<T>
              renderItems={renderItems}
              enabled={!searchValue}
              request={request}
              activeTab={activeTab}
              queryParams={queryParams}
              fetchRef={fetchRef}
            />
          </List>
        )}
      </Box>
    </>
  )
}

export default MenuList
