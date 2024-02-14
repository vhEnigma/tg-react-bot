import {FC, useEffect, useState} from 'react'
import {List, ListItemButton, ListItemText} from '@mui/material'
import Search from '../../components/Search'
import { useTheme } from '@mui/material/styles'
import { DirectionService } from '../../services/Direction'
import {useInView} from "react-intersection-observer";
import useDebounce from "../../hooks/useDebounce.ts";
import Loader from "../../components/Loader";

type ItemsType = {
  id: number, name: string
}

const Directions: FC = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [isStopInfinityScroll, setStopInfinityScroll] = useState(false)
  const theme = useTheme()
  const [downloadedPages, setDownloadedPages] = useState(1)
  const [renderList, setRenderList] = useState<ItemsType[]>([])
  const [searchList, setSearchList] = useState<ItemsType[] | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [isSearch, setSearch] = useState(false)
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const fetchList = async () => {

    const { result } = await DirectionService.listDirectionRequest({page:downloadedPages})
    setRenderList([...renderList, ...result, ...result])

    if (result.length === 0) {
      setStopInfinityScroll(true)
      return
    }

    setDownloadedPages(downloadedPages + 1)
  }

  useEffect(() => {
    fetchList()
  }, []);

  useEffect(() => {
    if (inView && !isStopInfinityScroll) {
      fetchList()
    }
  }, [inView])

  useEffect(() => {
    const findValues = async () => {
      setSearch(true)
      const {result} = await DirectionService.listDirectionRequest({searchValue: debouncedSearchValue, pageSize: 1000})
      setSearchList(result)
      setSearch(false)
    }
    if (debouncedSearchValue) {
      findValues()
    } else {
      setSearchList(null)
    }


  }, [debouncedSearchValue]);
  const getDirections = () => {
    const array = searchList ? searchList : renderList
    const lastIndex = array.length - 1
    return array.map(({ id, name }, index) => {
      const isLastElement = index === lastIndex
      const opacity = inView && !isStopInfinityScroll ? 0.5 : 1
      if (isLastElement) {
        return <ListItemButton ref={ref} key={id}
                               sx={{ borderTop: `1px solid ${theme.palette.customColors.button_color.main}`, opacity }}>
          <ListItemText primary={name} />
        </ListItemButton>
      }
      return <ListItemButton key={id}
                                 sx={{ borderTop: `1px solid ${theme.palette.customColors.button_color.main}`, opacity }}>
            <ListItemText primary={name} />
          </ListItemButton>

    })
  }
  console.log(isSearch, getDirections())
  return <>
    <Search value={searchValue} setValue={setSearchValue}/>
    <div>
      <List component="nav" aria-label="secondary mailbox folder">
        <Loader />
      </List>
    </div>
  </>
}

export default Directions