import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { QuestionType, TestType } from '../../types/menuList'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import MenuItemInfo from '../../components/MenuItemInfo'
import { TestService } from '../../services/TestService'

const Test: FC = () => {
  const { button_color, button_text_color, text_color, section_bg_color } = useTgTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [test, setTest] = useState<TestType>()

  useEffect(() => {
    const fetch = async () => {
      if (!id) return
      const response = await TestService.getTest(id)

      setTest(response)
      setLoading(false)
    }

    fetch()
  }, [])

  if (isLoading || !test) return <Loader />

  const handleBack = () => {
    navigate(-1)
  }

  const getQuestionList = (questions: QuestionType[]) =>
    questions.map((question) => {
      const { id, text } = question
      return (
        <Box
          key={id}
          sx={{
            p: '10px',
            m: '10px',
            textTransform: 'uppercase',
            borderBottom: `2px solid ${section_bg_color}`
          }}
        >
          {text}
        </Box>
      )
    })

  const { name: title, rating, difficulty, questions } = test

  return (
    <>
      <Button
        onClick={handleBack}
        fullWidth
        sx={{ mt: '20px', width: '25%', backgroundColor: button_color, color: button_text_color }}
        variant='contained'
      >
        Назад
      </Button>
      <Typography
        component='h1'
        sx={{
          margin: '20px 0 10px 0',
          textAlign: 'center',
          color: text_color,
          textTransform: 'uppercase'
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MenuItemInfo rating={rating} difficulty={difficulty} />
      </Box>
      {getQuestionList(questions)}
    </>
  )
}

export default Test
