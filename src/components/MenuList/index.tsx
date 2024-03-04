import { ReactNode, useEffect } from 'react'
import { Box, List } from '@mui/material'
import Search from '../Search'
import Loader from '../Loader'
import { IParams } from '../../types/params'
import useSearch from '../../hooks/useSearch'
import NotFound from '../NotFound'
import { calcLoaderWrapperHeight } from '../../utils/style'
import InfinityScrollList, { RenderItemsProps } from '../InfinityScrollList'
import { MenuItemType } from '../../types/menuList'
import { useTelegram } from '../../hooks/useTelegram'
import { TabsType } from '../../pages/SingleDirection/constants'

type MenuListProps<T> = {
  request: (params: IParams) => Promise<T[]>
  getItems: (props: RenderItemsProps<T>) => ReactNode
  requestId?: string
  activeTab?: TabsType
}

const MenuList = <T extends MenuItemType>({ requestId, activeTab, request, getItems }: MenuListProps<T>) => {
  const { searchList, setSearchList, setSearchValue, debouncedSearchValue, isSearch, setSearch, searchValue } = useSearch<T[]>()
  const { tg } = useTelegram()
  useEffect(() => {
    const findValues = async () => {
      setSearch(true)
      const params: IParams = { q: debouncedSearchValue, pageSize: 1000 }
      if (requestId) params.id = requestId
      const response = await request(params)
      setSearchList(response)
      setSearch(false)
    }
    console.log(debouncedSearchValue, !!debouncedSearchValue, 'FUCK')
    if (debouncedSearchValue) {
      findValues()
    } else {
      setSearchList(null)
    }
  }, [debouncedSearchValue])

  useEffect(() => {
    if (activeTab) {
      setSearchList(null)
      setSearchValue('')
    }
  }, [activeTab])

  const renderItems = (props: RenderItemsProps<T>) => {
    if (Array.isArray(searchList) && searchList.length === 0) {
      tg.HapticFeedback.notificationOccurred('error')
      return <NotFound />
    }
    const array = searchList || props.dataList
    console.log(array, 'array', searchList, 'searchList', props.dataList, 'dataList')

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
          <List component='div' aria-label='secondary mailbox folder'>
            <InfinityScrollList<T>
              renderItems={renderItems}
              enabled={!searchValue}
              request={request}
              activeTab={activeTab}
              requestId={requestId}
            />
          </List>
        )}
      </Box>
    </>
  )
}

export default MenuList
