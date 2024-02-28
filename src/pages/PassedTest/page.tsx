import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import useBackButton from '../../hooks/useBackButton'
import Loader from '../../components/Loader'
import { AnswerType, PassedTestResponseType, QuestionType } from '../../types/menuList'
import useTgTheme from '../../hooks/useTgTheme'

const mockResponse: PassedTestResponseType = {
  technology_id: 1,
  counter: 1,
  course_id: 1,
  difficulty: 1,
  id: 1,
  direction_id: 1,
  is_available: true,
  name: 'passed test',
  questions: [
    {
      id: 1,
      text: 'questions passed text',
      answer_options: [
        {
          id: 1,
          text: 'answer passed test',
          is_correct: false,
          weight: 1
        }
      ]
    }
  ]
}

const PassedTest: FC = () => {
  const { text_color, section_bg_color, bg_color } = useTgTheme()
  const { id } = useParams()
  const [test, setTest] = useState<PassedTestResponseType>()
  const [isLoader, setLoader] = useState(true)
  useBackButton()

  useEffect(() => {
    const fetch = async () => {
      // const response = await
      setLoader(false)
      setTest(mockResponse)
    }
    if (id) {
      fetch()
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
          {text}
        </Typography>
      )
    })

  const getQuestionList = (questions: QuestionType[]) =>
    questions.map((question, index) => {
      const { id, text, answer_options } = question
      const answers = renderAnswers(answer_options)
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
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >{`Выбранные ответы: ${answers}`}</Box>
        </Box>
      )
    })

  return getQuestionList(test.questions)
}

export default PassedTest
