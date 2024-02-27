import { FC } from 'react'
import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useTelegram } from '../../hooks/useTelegram'
import useTgTheme from '../../hooks/useTgTheme'
import Loader from '../../components/Loader'
import useUserInfo from '../../hooks/useUserInfo'
import New from '../../components/New'

const Root: FC = () => {
  const { user } = useTelegram()
  const { text_color, button_color } = useTgTheme()
  const { userInfo, isLoading } = useUserInfo(user.id)

  if (isLoading || !userInfo) {
    return <Loader />
  }

  const getTestList = () =>
    userInfo.test_results.map(({ id, result, name }) => {
      const displayValue = `${name} - ${result}% (X) раз пройден`
      return (
        <ListItemButton key={id} sx={{ borderTop: `1px solid ${button_color}` }}>
          <ListItemText primary={displayValue} />
        </ListItemButton>
      )
    })

  const title = `${userInfo.first_name} ${userInfo.last_name}`
  return (
    <>
      <Box>
        <Typography component='h1' sx={{ margin: '20px 0', textAlign: 'center', color: text_color }}>
          {title}
        </Typography>
        <List component='div' aria-label='secondary mailbox folder'>
          {getTestList()}
        </List>
      </Box>
      <New />
    </>
  )
}

export default Root
