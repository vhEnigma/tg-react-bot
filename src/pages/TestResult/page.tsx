import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import useUserInfo from '../../hooks/useUserInfo'
import Loader from '../../components/Loader'
import { useTelegram } from '../../hooks/useTelegram'
import useTgTheme from '../../hooks/useTgTheme'

const TestResult: FC = () => {
  const { text_color } = useTgTheme()
  const { user } = useTelegram()
  const { id } = useParams()
  const { userInfo, isLoading } = useUserInfo(user.id)

  if (isLoading || !userInfo) {
    return <Loader />
  }

  const test = userInfo.test_results.find((test) => test.id === Number(id))!

  return (
    <Box>
      <Typography component='h1' sx={{ m: '20px 0', textAlign: 'center', color: text_color }}>
        {test.name}
      </Typography>

      <Typography component='p' sx={{ m: '20px 0', textAlign: 'center', color: text_color }}>
        {`${userInfo.first_name} ${userInfo.last_name}`}
      </Typography>

      <Box />
    </Box>
  )
}

export default TestResult
