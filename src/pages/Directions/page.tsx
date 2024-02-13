import { FC, useEffect, useState } from 'react'
import { List, ListItemButton, ListItemText } from '@mui/material'
import { useScrollFetching } from '../../hooks/useScrollFetching.ts'
import Search from '../../components/Search'
import { useTheme } from '@mui/material/styles'
import { DirectionService } from '../../services/Direction'

const Directions: FC = () => {
  const theme = useTheme()
  const [isFetching, setFetching] = useState(true)
  const [isSearchMode] = useState(false)
  const [downloadedPages, setDownloadedPages] = useState(1)
  const [renderList, setRenderList] = useState<{ id: number, name: string }[]>([])
  useScrollFetching({ setFetching, isSearchMode })

  useEffect(() => {
    const downloadData = async () => {
      if (isFetching) {
        document.body.style.cursor = 'wait'
        const { result } = await DirectionService.listDirectionRequest(downloadedPages)
        console.log(result, 'fuck')

        setFetching(false)
        setRenderList([...renderList, ...result])
        if (result.length !== 0) {
          setDownloadedPages(downloadedPages + 1)
        }
        document.body.style.cursor = 'default'
      }
    }
    downloadData()
  }, [isFetching, renderList, downloadedPages])

  const getDirections = () => {
    return renderList.map(({ id, name }) => {
      return <ListItemButton key={id} dense
                             sx={{ borderTop: `1px solid ${theme.palette.customColors.button_color.main}` }}>
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