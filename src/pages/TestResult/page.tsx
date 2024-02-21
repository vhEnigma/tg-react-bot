import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import useUserInfo from '../../hooks/useUserInfo'
import Loader from '../../components/Loader'
import { useTelegram } from '../../hooks/useTelegram'
import useTgTheme from '../../hooks/useTgTheme'
import CustomRating from '../../components/CustomRating'
import ErrorBoundary from '../ErrorBoundary'
import { TestService } from '../../services/TestService'

const TestResult: FC = () => {
  const { text_color, section_bg_color } = useTgTheme()
  const { user } = useTelegram()
  const { id } = useParams()
  const { userInfo, isLoading } = useUserInfo(user.id)
  const [userRating, setUserRating] = useState(0)

  const test = userInfo?.test_results.find((test) => test.id === Number(id))

  useEffect(() => {
    if (test) {
      setUserRating(test.rating)
    }
  }, [test])

  if (isLoading || !userInfo) {
    return <Loader />
  }

  if (!test) {
    return <ErrorBoundary />
  }

  const handleChangeRating = async (_: SyntheticEvent<Element, Event>, newValue: number | null) => {
    if (!newValue || !id) return
    setUserRating(newValue)

    await TestService.setRating(id, newValue)
  }

  return (
    <Box>
      <Typography component='h1' sx={{ m: '20px 0', textAlign: 'center', color: text_color }}>
        {test.name}
      </Typography>

      <Typography component='p' sx={{ m: '20px 0', textAlign: 'center', color: text_color }}>
        {`${userInfo.first_name} ${userInfo.last_name}`}
      </Typography>

      <Box
        sx={{
          backgroundColor: section_bg_color,
          color: text_color,
          borderRadius: '50%',
          border: `1px solid section_bg_color`,
          width: '50%',
          height: '35vh',
          m: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '40px'
        }}
      >{`${test.result} %`}</Box>
      <Typography component='p' sx={{ m: '20px 0', textAlign: 'center', color: text_color }}>
        Результат теста
      </Typography>
      <CustomRating rating={userRating} onChange={handleChangeRating} />
    </Box>
  )
}

export default TestResult
