import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Checkbox, Typography } from '@mui/material'
import { AnswerType, QuestionType, TestType } from '../../types/menuList'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import MenuItemInfo from '../../components/MenuItemInfo'
import { TestService } from '../../services/TestService'

// const body = {
//   id_question: ['id_answers']
// }

const Test: FC = () => {
  const { button_color, button_text_color, text_color, section_bg_color, bg_color } = useTgTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [test, setTest] = useState<TestType>()
  // const [answersMap, setAnswersMap] = useState()

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

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, questionId: number, answerId: number) => {
    console.log(event, questionId, 'questionId', answerId, 'answerId')
  }

  const renderAnswers = (answers: AnswerType[], questionId: number) =>
    answers.map((answer) => {
      const { id, text } = answer
      return (
        <Box key={id} sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Checkbox onChange={(event) => onChangeHandler(event, questionId, id)} />
          <Typography sx={{ color: text_color }}>{text}</Typography>
        </Box>
      )
    })

  const getQuestionList = (questions: QuestionType[]) =>
    questions.map((question, index) => {
      const { id, text, answer_options } = question
      const answers = renderAnswers(answer_options, id)
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
            {index + 1}. {text}
          </Typography>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>{answers}</Box>
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button sx={{ mt: '20px', width: '50%', color: button_text_color, backgroundColor: button_color }} variant='contained'>
          Отправить
        </Button>
      </Box>
    </>
  )
}

export default Test
