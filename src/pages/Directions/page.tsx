import {FC, useCallback, useEffect, useRef, useState} from 'react'
import { List, ListItemButton, ListItemText } from '@mui/material'
import Search from '../../components/Search'
import { useTheme } from '@mui/material/styles'
import { DirectionService } from '../../services/Direction'
import useInfinityObserver from '../../hooks/useIntersectionObserver.ts'

const Directions: FC = () => {
  const theme = useTheme()
  const [isFetching, setFetching] = useState(true)
  const [downloadedPages, setDownloadedPages] = useState(1)
  const [renderList, setRenderList] = useState<{ id: number, name: string }[]>([])
  const lastElementRef = useRef<HTMLDivElement>(null)

  const fetchList = useCallback(async () => {
    const { result } = await DirectionService.listDirectionRequest(downloadedPages)
    console.log('fetch list', lastElementRef, 'lastel', result, 'result', renderList, 'renderList')
    setFetching(false)
    setRenderList([...renderList, ...result])

    if (result.length === 0) {
      return
    }

    setDownloadedPages(downloadedPages + 1)
  }, [renderList, downloadedPages, lastElementRef.current])

  useInfinityObserver(lastElementRef, fetchList)

  useEffect(() => {
    if (isFetching) {
      fetchList()
    }
  }, [isFetching, fetchList])
  console.log(lastElementRef, 'lastElementRef')
  const getDirections = () => {
    const lastIndex = renderList.length - 1
    return renderList.map(({ id, name }, index) => {
      console.log(lastIndex, 'lastindex', index, 'index')
      if (index === lastIndex) {
        console.log('FUCKING SHIT')
        return <ListItemButton ref={lastElementRef} key={id}
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