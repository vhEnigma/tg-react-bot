import { FC, useEffect, useState } from 'react'
import { List, ListItemButton, ListItemText } from '@mui/material'
import { useDirections } from '../../hooks/useDirections.ts'
import { useScrollFetching } from '../../hooks/useScrollFetching.ts'
import Search from '../../components/Search'
import { useTheme } from '@mui/material/styles'

const Directions: FC = () => {
  const theme = useTheme()
  const [isFetching, setFetching] = useState(true)
  const [isSearchMode] = useState(false)
  const [downloadedPages, setDownloadedPages] = useState(0)
  const { refetch, data } = useDirections(downloadedPages)
  const [renderList, setRenderList] = useState<{ id: number, name: string }[]>(data?.result || [])
  useScrollFetching({ setFetching, isSearchMode })

  useEffect(() => {
    const downloadData = async () => {
      if (isFetching) {
        document.body.style.cursor = 'wait'
        const { data, isSuccess } = await refetch()
        if (!isSuccess) return
        setFetching(false)
        setRenderList([...renderList, ...data.result])
        if (data.result.length !== 0) {
          setDownloadedPages(downloadedPages + 1)
        }
        document.body.style.cursor = 'default'
      }
    }
    downloadData()
  }, [isFetching])

  const getDirections = () => {
    return renderList.map(({ id, name }) => {
      return <ListItemButton key={id} dense sx={{ borderTop: `1px solid ${theme.palette.customColors.main}` }}>
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