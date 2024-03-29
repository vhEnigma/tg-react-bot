import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import useBackButton from '../../hooks/useBackButton'
import Loader from '../../components/Loader'
import { AnswerType, PassedTestResponseType, QuestionType } from '../../types/menuList'
import useTgTheme from '../../hooks/useTgTheme'
import { TestService } from '../../services/TestService'

const PassedTest: FC = () => {
  const { text_color, section_bg_color, bg_color } = useTgTheme()
  const { id } = useParams()
  const [test, setTest] = useState<PassedTestResponseType>()
  const [isLoader, setLoader] = useState(true)
  useBackButton()

  useEffect(() => {
    const fetch = async (id: string) => {
      const response = await TestService.getTestResult(id)
      setLoader(false)
      setTest(response)
    }
    if (id) {
      fetch(id)
    }
  }, [])

  if (isLoader || !id || !test) {
    return <Loader />
  }

  const renderAnswers = (answers: AnswerType[]) =>
    answers.map((answer) => {
      const { id, text } = answer

      return (
        <Typography key={id} sx={{ color: text_color }}>
          {`- ${text}`}
        </Typography>
      )
    })

  const getQuestionList = (questions: QuestionType[]) =>
    questions.map((question, index) => {
      const { id, text, attempt_answers } = question
      const answers = renderAnswers(attempt_answers)
      return (
        <Box
          key={id}
          sx={{
            p: '10px',
            m: '10px',
            backgroundColor: section_bg_color,
            borderBottom: `2px solid ${bg_color}`,
            color: text_color
          }}
        >
          <Typography sx={{ color: text_color }}>
            Вопрос №{index + 1}: {text}
          </Typography>
          <Typography sx={{ color: text_color }}>Выбранные ответы:</Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {answers}
          </Box>
        </Box>
      )
    })

  return getQuestionList(test.test_questions)
}

export default PassedTest
