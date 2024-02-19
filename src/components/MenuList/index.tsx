import { FC, useEffect } from 'react'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Search from '../Search'
import Loader from '../Loader'
import { MenuListType } from '../../types/menuList'
import useTgTheme from '../../hooks/useTgTheme'
import { IParams } from '../../types/params'
import useSearch from '../../hooks/useSearch'
import NotFound from '../NotFound'
import { calcLoaderWrapperHeight } from '../../utils/style'
import InfinityScrollList, { RenderItemsProps } from '../InfinityScrollList'

type DirectionsProps = {
  request: (params: IParams) => Promise<MenuListType[]>
  route: string
}

const MenuList: FC<DirectionsProps> = ({ route, request }) => {
  const { button_color } = useTgTheme()
  const navigate = useNavigate()
  const { searchList, setSearchList, setSearchValue, debouncedSearchValue, isSearch, setSearch, searchValue } = useSearch<MenuListType[]>()

  useEffect(() => {
    const findValues = async () => {
      setSearch(true)
      const response = await request({ q: debouncedSearchValue, pageSize: 1000 })
      setSearchList(response)
      setSearch(false)
    }
    if (debouncedSearchValue) {
      findValues()
    } else {
      setSearchList(null)
    }
  }, [debouncedSearchValue])

  const openItemHandle = (id: number) => {
    navigate(`/${route}/${id}`)
  }
  const renderItems = (props: RenderItemsProps<MenuListType>) => {
    const { ref, dataList: renderList } = props
    if (Array.isArray(searchList) && searchList.length === 0) {
      return <NotFound />
    }
    const array = searchList || renderList
    const lastIndex = array.length - 1

    return array.map(({ id, name }, index) => {
      const isLastElement = index === lastIndex
      if (isLastElement) {
        return (
          <ListItemButton ref={ref} onClick={() => openItemHandle(id)} key={id} sx={{ borderTop: `1px solid ${button_color}` }}>
            <ListItemText primary={name} />
          </ListItemButton>
        )
      }
      return (
        <ListItemButton onClick={() => openItemHandle(id)} key={id} sx={{ borderTop: `1px solid ${button_color}` }}>
          <ListItemText primary={name} />
        </ListItemButton>
      )
    })
  }

  return (
    <>
      <Box>
        <Search value={searchValue} setValue={setSearchValue} />
      </Box>
      <Box sx={{ height: calcLoaderWrapperHeight(72) }}>
        {isSearch ? (
          <Loader />
        ) : (
          <List component='div' aria-label='secondary mailbox folder'>
            <InfinityScrollList<MenuListType> renderItems={renderItems} enabled={!searchValue} request={request} />
          </List>
        )}
      </Box>
    </>
  )
}

export default MenuList
