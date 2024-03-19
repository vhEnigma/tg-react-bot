import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram'
import useTgTheme from '../../hooks/useTgTheme'
import Loader from '../../components/Loader'
import useUserInfo from '../../hooks/useUserInfo'
import New from '../../components/New'
import { RouteList } from '../../routes/routes'

const Root: FC = () => {
  const { user } = useTelegram()
  const { text_color, button_color, button_text_color } = useTgTheme()
  const { userInfo, isLoading } = useUserInfo(user.id)
  const navigate = useNavigate()

  if (isLoading || !userInfo) {
    return <Loader />
  }

  const title = `${userInfo.first_name} ${userInfo.last_name}`

  return (
    <>
      <Box>
        <Typography
          component='h1'
          sx={{
            margin: '20px 0',
            textAlign: 'left',
            fontWeight: 'bold',
            color: text_color,
            fontSize: '2rem'
          }}
        >
          {title} <img width={30} height={30} src='./hand-emodji.webp' alt='Привет!' />
        </Typography>
        <Button
          onClick={() => navigate(RouteList.History)}
          sx={{ m: '10px', backgroundColor: button_color, color: button_text_color }}
          variant='contained'
        >
          Просмотреть историю
        </Button>
      </Box>
      <New />
    </>
  )
}

export default Root
