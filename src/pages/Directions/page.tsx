import { FC, useEffect, useState } from 'react'
import Search from '../../components/Search'
import { List, ListItemButton, ListItemText } from '@mui/material'
import { useDirections } from '../../hooks/useDirections.ts'
import { useScrollFetching } from '../../hooks/useScrollFetching.ts'


const Directions: FC = () => {

  const [isFetching, setFetching] = useState(true)
  const [isSearchMode] = useState(false)
  const [downloadedPages, setDownloadedPages] = useState(0)
  const { refetch } = useDirections(downloadedPages)
  const [renderList, setRenderList] = useState<{ id: number, name: string }[]>([])
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

  // if (isLoading) return <Loader />
  const getDirections = () => {
    // if (!isSuccess) return
    return renderList.map(({ id, name }) => {
      return <ListItemButton key={id} dense sx={{ borderTop: '1px solid #1976d2' }}>
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