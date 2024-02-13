import {FC, useEffect, useState} from 'react'
import { List, ListItemButton, ListItemText } from '@mui/material'
import Search from '../../components/Search'
import { useTheme } from '@mui/material/styles'
import { DirectionService } from '../../services/Direction'
import {useInView} from "react-intersection-observer";

const Directions: FC = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [isStopInfinityScroll, setStopInfinityScroll] = useState(false)
  const theme = useTheme()
  const [downloadedPages, setDownloadedPages] = useState(1)
  const [renderList, setRenderList] = useState<{ id: number, name: string }[]>([])
  const [searchValue, setSearchValue] = useState('')

  const fetchList = async () => {
    console.log(searchValue, 'searchValue')
    const { result } = await DirectionService.listDirectionRequest(downloadedPages)
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
  const getDirections = () => {
    const lastIndex = renderList.length - 1
    return renderList.map(({ id, name }, index) => {
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

  return <>
    <Search value={searchValue} setValue={setSearchValue}/>
    <List component="nav" aria-label="secondary mailbox folder">
      {getDirections()}
    </List>
  </>
}

export default Directions