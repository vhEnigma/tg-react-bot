import { FC, useEffect, useState } from 'react'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Search from '../Search'
import Loader from '../Loader'
import { MenuListType } from '../../types/menuList'
import useTgTheme from '../../hooks/useTgTheme'
import { IParams } from '../../types/params'
import useSearch from '../../hooks/useSearch'
import NotFound from '../NotFound'
import useInfinityScroll from '../../hooks/useInfinityScroll'
import { calcLoaderWrapperHeight } from '../../utils/style'
import { PAGE_SIZE } from '../../constants/common'
import useMenuList from '../../hooks/tanstack/useMenuList'

type DirectionsProps = {
  callback: (params: IParams) => Promise<MenuListType[]>
  route: string
  queryKey: string
}

const MenuList: FC<DirectionsProps> = ({ route, queryKey, callback }) => {
  const { ref, inView, setStopInfinityScroll, isStopInfinityScroll, downloadedPages, setDownloadedPages } = useInfinityScroll()
  const { button_color } = useTgTheme()
  // const [isLoading, setLoading] = useState(true)
  const [renderList, setRenderList] = useState<MenuListType[]>([])
  const { searchList, setSearchList, setSearchValue, debouncedSearchValue, isSearch, setSearch, searchValue } = useSearch<MenuListType[]>()
  const navigate = useNavigate()
  const {
    isLoading,
    data: response,
    isSuccess
  } = useMenuList({
    callback,
    params: { page: downloadedPages },
    queryKey,
    condition: inView && !isStopInfinityScroll
  })

  useEffect(() => {
    if (!isSuccess) return
    setRenderList([...renderList, ...response])
    if (response.length < PAGE_SIZE) {
      setStopInfinityScroll(true)
      return
    }

    setDownloadedPages(downloadedPages + 1)
  }, [response])

  useEffect(() => {
    const findValues = async () => {
      setSearch(true)
      const response = await callback({ q: debouncedSearchValue, pageSize: 1000 })
      setSearchList(response)
      setSearch(false)
    }
    if (debouncedSearchValue) {
      findValues()
    } else {
      setSearchList(null)
    }
  }, [debouncedSearchValue])

  if (isLoading) return <Loader />

  const openItemHandle = (id: number) => {
    navigate(`/${route}/${id}`)
  }
  const getDirections = () => {
    if (Array.isArray(searchList) && searchList.length === 0) {
      return <NotFound />
    }

    const array = searchList || renderList
    const lastIndex = array.length - 1
    return array.map(({ id, name }, index) => {
      const isLastElement = index === lastIndex
      const opacity = inView && !isStopInfinityScroll ? 0.3 : 1
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
            {getDirections()}
          </List>
        )}
      </Box>
    </>
  )
}

export default MenuList
