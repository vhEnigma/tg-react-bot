import { FC, useEffect } from 'react'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DirectionService } from '../../services/Direction'
import { RouteList } from '../../routes/routes'
import InfinityScrollList, { RenderItemsProps } from '../../components/InfinityScrollList'
import { MenuListType } from '../../types/menuList'
import useTgTheme from '../../hooks/useTgTheme'
import Search from '../../components/Search'
import { calcLoaderWrapperHeight } from '../../utils/style'
import Loader from '../../components/Loader'
import useSearch from '../../hooks/useSearch'
import NotFound from '../../components/NotFound'

const Directions: FC = () => {
  const { button_color } = useTgTheme()
  const navigate = useNavigate()
  const { searchList, setSearchList, setSearchValue, debouncedSearchValue, isSearch, setSearch, searchValue } = useSearch<MenuListType[]>()

  useEffect(() => {
    const findValues = async () => {
      setSearch(true)
      const response = await DirectionService.listDirectionRequest({ q: debouncedSearchValue, pageSize: 1000 })
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
    navigate(`/${RouteList.Directions}/${id}`)
  }
  const renderItems = (props: RenderItemsProps<MenuListType>) => {
    const { ref, isFetchingNextPage, dataList: renderList } = props
    if (Array.isArray(searchList) && searchList.length === 0) {
      return <NotFound />
    }
    const array = searchList || renderList
    const lastIndex = array.length - 1
    const opacity = isFetchingNextPage && !!searchList?.length ? 0.3 : 1

    return array.map(({ id, name }, index) => {
      const isLastElement = index === lastIndex
      if (isLastElement) {
        return (
          <ListItemButton ref={ref} onClick={() => openItemHandle(id)} key={id} sx={{ borderTop: `1px solid ${button_color}`, opacity }}>
            <ListItemText primary={name} />
          </ListItemButton>
        )
      }
      return (
        <ListItemButton onClick={() => openItemHandle(id)} key={id} sx={{ borderTop: `1px solid ${button_color}`, opacity }}>
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
            <InfinityScrollList<MenuListType>
              renderItems={renderItems}
              enabled={!!searchValue}
              request={DirectionService.listDirectionRequest}
            />
          </List>
        )}
      </Box>
    </>
  )
}

export default Directions
