import { FC, useEffect, useState } from 'react'
import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useTelegram } from '../../hooks/useTelegram'
import useTgTheme from '../../hooks/useTgTheme'
import { UserService, UserType } from '../../services/User'
import Loader from '../../components/Loader'

const Root: FC = () => {
  const {
    user: { username, first_name, id }
  } = useTelegram()
  const { text_color, button_color } = useTgTheme()
  const [userInfo, setUserInfo] = useState<UserType | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const response = await UserService.getUserInfo(id)
      setUserInfo(response)
      setLoading(false)
    }
    fetch()
  }, [])

  if (isLoading || !userInfo) {
    return <Loader />
  }

  const getTestList = () =>
    userInfo.test_results.map(({ id, result, name }) => {
      const displayValue = `${name} - ${result}%`
      return (
        <ListItemButton key={id} sx={{ borderTop: `1px solid ${button_color}` }}>
          <ListItemText primary={displayValue} />
        </ListItemButton>
      )
    })

  const title = `${first_name} (${username})`
  return (
    <Box>
      <Typography component='h1' sx={{ margin: '20px 0', textAlign: 'center', color: text_color }}>
        {title}
      </Typography>
      <List component='div' aria-label='secondary mailbox folder'>
        {getTestList()}
      </List>
    </Box>
  )
}

export default Root
