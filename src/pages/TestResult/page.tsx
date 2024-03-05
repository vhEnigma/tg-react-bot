import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import useUserInfo from '../../hooks/useUserInfo'
import Loader from '../../components/Loader'
import { useTelegram } from '../../hooks/useTelegram'
import useTgTheme from '../../hooks/useTgTheme'
import CustomRating from '../../components/CustomRating'
import { TestService } from '../../services/TestService'
import { PassedTestResponseType } from '../../types/menuList'

const thresholdColors: Record<number, string> = {
  33: 'red',
  66: 'yellow',
  100: 'green'
}

type KeysType = 33 | 66 | 100 | undefined

const TestResult: FC = () => {
  const { text_color } = useTgTheme()
  const { user } = useTelegram()
  const { id } = useParams()
  const { userInfo } = useUserInfo(user.id)
  const [isLoading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [testResult, setTestResult] = useState<PassedTestResponseType | null>(null)

  const test = null

  useEffect(() => {
    const fetch = async (id: string) => {
      const response = await TestService.getTestResultById(id)
      setTestResult(response)
      setLoading(false)
    }
    if (id) {
      fetch(id)
    }
  }, [])

  useEffect(() => {
    if (testResult) {
      setUserRating(testResult.rating)
    }
  }, [testResult])

  if (isLoading || !userInfo || !testResult) {
    return <Loader />
  }

  const handleChangeRating = async (_: SyntheticEvent<Element, Event>, newValue: number | null) => {
    if (!newValue || !id) return
    setUserRating(newValue)

    await TestService.setRating(id, newValue)
  }

  const calcBackground = (percentage: number) => {
    const threshold = Object.keys(thresholdColors).find((key) => percentage <= Number(key)) as KeysType

    if (threshold) {
      return thresholdColors[threshold]
    }
  }

  return (
    <Box>
      <Typography component='h1' sx={{ m: '20px 0', textAlign: 'center', color: text_color }}>
        {test}
      </Typography>

      <Typography component='p' sx={{ m: '20px 0', textAlign: 'center', color: text_color }}>
        {`${userInfo.first_name} ${userInfo.last_name}`}
      </Typography>

      <Box
        sx={{
          backgroundColor: calcBackground(testResult.percentage),
          color: text_color,
          borderRadius: '50%',
          border: `1px solid section_bg_color`,
          width: '50%',
          height: 'auto',
          m: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '40px',
          aspectRatio: '1/1'
        }}
      >{`${testResult.percentage} %`}</Box>
      <Typography component='p' sx={{ m: '20px 0', textAlign: 'center', color: text_color }}>
        Результат теста
      </Typography>
      <CustomRating rating={userRating} onChange={handleChangeRating} />
    </Box>
  )
}

export default TestResult
