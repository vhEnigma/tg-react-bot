import { FC } from 'react'
import {useTelegram} from "../../hooks/useTelegram.ts";
import {Box, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import useTgTheme from "../../hooks/useTgTheme.ts";

const mock = [
  {
    id: 1,
    title: 'test1',
    progress: '98%'
  },
  {
    id: 2,
    title: 'test2',
    progress: '1%'
  },
  {
    id: 3,
    title: 'test3',
    progress: '42%'
  }
] as const

const Root: FC = () => {
  const {user:{username, first_name}} = useTelegram()
  const {text_color, button_color} = useTgTheme()
  window.location.href = 'directions/1037'

  const getTestList = () => {
    return mock.map(({id, progress, title}) => {
      const displayValue = `${title} - ${progress}`
      return <ListItemButton key={id} sx={{ borderTop: `1px solid ${button_color}` }}>
        <ListItemText primary={displayValue} />
      </ListItemButton>
    })
  }

  const title = `${first_name} (${username})`
  return <Box>
    <Typography component='h1' sx={{margin: '20px 0', textAlign: 'center', color: text_color}}>
    {title}
  </Typography>
    <List component="div" aria-label="secondary mailbox folder">
      {getTestList()}
    </List>
  </Box>
}

export default Root