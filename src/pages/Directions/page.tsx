import {FC, useEffect, useRef, useState} from 'react'
import { List, ListItemButton, ListItemText } from '@mui/material'
import Search from '../../components/Search'
import { useTheme } from '@mui/material/styles'
import { DirectionService } from '../../services/Direction'
import {useInView} from "react-intersection-observer";

const Directions: FC = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const theme = useTheme()
  const [downloadedPages, setDownloadedPages] = useState(1)
  const [renderList, setRenderList] = useState<{ id: number, name: string }[]>([])
  const lastElementRef = useRef<HTMLDivElement>(null)
  console.log(inView, 'inView')

  const fetchList = async () => {
    const { result } = await DirectionService.listDirectionRequest(downloadedPages)
    console.log('fetch list', result, 'result', renderList, 'renderList')
    setRenderList([...renderList, ...result, ...result])

    if (result.length === 0) {
      return
    }

    setDownloadedPages(downloadedPages + 1)
  }

  useEffect(() => {
    fetchList()
  }, []);

  useEffect(() => {
    if (inView) {
      fetchList()
    }
  }, [inView])
  const getDirections = () => {
    const lastIndex = renderList.length - 1
    return renderList.map(({ id, name }, index) => {
      const isLastElement = index === lastIndex
      if (isLastElement) {
        console.log('FUCKING SHIT', lastIndex, 'lastindex', index, 'index')
        return <ListItemButton ref={ref} key={id}
                               sx={{ borderTop: `1px solid ${theme.palette.customColors.button_color.main}`, opacity: `${inView ? 0.5 : 1}` }}>
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