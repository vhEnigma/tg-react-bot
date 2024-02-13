import {FC, useCallback, useEffect, useRef, useState} from 'react'
import { List, ListItemButton, ListItemText } from '@mui/material'
import Search from '../../components/Search'
import { useTheme } from '@mui/material/styles'
import { DirectionService } from '../../services/Direction'
import {useInView} from "react-intersection-observer";

const Directions: FC = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.1,
  });
  const theme = useTheme()
  const [isFetching, setFetching] = useState(true)
  const [downloadedPages, setDownloadedPages] = useState(1)
  const [renderList, setRenderList] = useState<{ id: number, name: string }[]>([])
  const lastElementRef = useRef<HTMLDivElement>(null)
  console.log(inView, 'inView')
  const fetchList = useCallback(async () => {
    const { result } = await DirectionService.listDirectionRequest(downloadedPages)
    console.log('fetch list', result, 'result', renderList, 'renderList')
    setFetching(false)
    setRenderList([...renderList, ...result, ...result])

    if (result.length === 0) {
      // console.log(lastElementRef.current)
      // if (!lastElementRef.current) return
      // console.log('observe')
      // observer.unobserve(lastElementRef.current)
      return
    }

    setDownloadedPages(downloadedPages + 1)
  }, [renderList, downloadedPages, lastElementRef.current])

  // const observer = useInfinityObserver(lastElementRef, fetchList)

  useEffect(() => {
    if (isFetching) {
      fetchList()
    }
  }, [isFetching, fetchList])
  const getDirections = () => {
    const lastIndex = renderList.length - 1
    return renderList.map(({ id, name }, index) => {
      const isLastElement = index === lastIndex
      if (isLastElement) {
        console.log('FUCKING SHIT', lastIndex, 'lastindex', index, 'index')
        return <ListItemButton ref={ref} key={id}
                               sx={{ borderTop: `1px solid ${theme.palette.customColors.button_color.main}` }}>
          <ListItemText primary={name} />
        </ListItemButton>
      }
      return <ListItemButton key={id}
                                 sx={{ borderTop: `1px solid ${theme.palette.customColors.button_color.main}` }}>
            <ListItemText primary={name} />
          </ListItemButton>

    })
  }

  return <>
    <Search />
    <List ref={lastElementRef} component="nav" aria-label="secondary mailbox folder">
      {getDirections()}
    </List>
  </>
}

export default Directions