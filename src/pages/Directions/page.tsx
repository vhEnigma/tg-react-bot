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
  console.log(inView, 'inView')

  const fetchList = async () => {
    const { result } = await DirectionService.listDirectionRequest(downloadedPages)
    console.log('fetch list', result, 'result', renderList, 'renderList')
    setRenderList([...renderList, ...result, ...result])

    if (result.length === 0) {
      console.log('stop')
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
      if (isLastElement) {
        return <ListItemButton ref={ref} key={id}
                               sx={{ borderTop: `1px solid ${theme.palette.customColors.button_color.main}`, opacity: `${inView ? 0.5 : 1}` }}>
          <ListItemText primary={name} />
        </ListItemButton>
      }
      return <ListItemButton key={id}
                                 sx={{ borderTop: `1px solid ${theme.palette.customColors.button_color.main}`, opacity: `${inView ? 0.5 : 1}` }}>
            <ListItemText primary={name} />
          </ListItemButton>

    })
  }

  return <>
    <Search />
    <List component="nav" aria-label="secondary mailbox folder">
      {getDirections()}
    </List>
  </>
}

export default Directions