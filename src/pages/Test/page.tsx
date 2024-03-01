import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { AnswerType, QuestionType, TestType } from '../../types/menuList'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import MenuItemInfo from '../../components/MenuItemInfo'
import { TestService } from '../../services/TestService'
import { useTelegram } from '../../hooks/useTelegram'
import { RouteList } from '../../routes/routes'
import { TechnologyService } from '../../services/Technology'
import { DirectionService } from '../../services/Direction'
import useBackButton from '../../hooks/useBackButton'

const Test: FC = () => {
  const { tg, user } = useTelegram()
  const { button_color, button_text_color, text_color, section_bg_color, bg_color } = useTgTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [test, setTest] = useState<TestType>()
  const [testInfo, setTestInfo] = useState({ technology: '', direction: '' })
  const [answersMap, setAnswersMap] = useState<Record<string, number[]>>()
  const [errorQuestionIds, setErrorQuestionIds] = useState<number[]>([])
  useBackButton()

  useEffect(() => {
    const fetch = async () => {
      if (!id) return
      const response = await TestService.getTest(id)
      const technology = await TechnologyService.getTechnologyInfoRequest(`${response.technology_id}`)
      const direction = await DirectionService.getDirectionInfoRequest(`${response.direction_id}`)
      const map: Record<string, number[]> = {}
      response.questions.forEach(({ id }) => {
        map[id] = []
      })
      setTest(response)
      setAnswersMap(map)
      setLoading(false)
      setTestInfo({ technology: technology.name, direction: direction.name })
    }

    fetch()
  }, [])

  if (isLoading || !answersMap || !id || !test) return <Loader />

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, questionId: number, answerId: number) => {
    const { checked } = event.target
    if (!answersMap) return
    const map = { ...answersMap }
    let errors = [...errorQuestionIds]
    if (checked) {
      map[`${questionId}`].push(answerId)
      errors = errorQuestionIds.filter((id) => id !== questionId)
    } else {
      map[`${questionId}`] = map[`${questionId}`].filter((number) => number !== answerId)
    }
    setErrorQuestionIds(errors)
    setAnswersMap(map)
  }

  const renderAnswers = (answers: AnswerType[], questionId: number) =>
    answers.map((answer) => {
      const { id, text } = answer

      return (
        <FormGroup key={id} sx={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <FormControlLabel
            control={<Checkbox onChange={(event) => onChangeHandler(event, questionId, id)} />}
            label={<Typography sx={{ color: text_color }}>{text}</Typography>}
          />
        </FormGroup>
      )
    })

  const getQuestionList = (questions: QuestionType[]) =>
    questions.map((question, index) => {
      const { id, text, attempt_answers } = question
      const answers = renderAnswers(attempt_answers, id)
      const isError = errorQuestionIds.includes(id)
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
          {isError && <Typography sx={{ color: 'red' }}>Нужно ответить на вопрос</Typography>}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>{answers}</Box>
        </Box>
      )
    })

  const onSendAnswers = async () => {
    setLoading(true)
    await TestService.sendTest({ answersMap, id, tgId: user.id })
    setLoading(false)
    navigate(`/${RouteList.TestResult}/${id}`)
  }

  const validateHandle = () => {
    if (!answersMap) return
    const questionIdList = Object.keys(answersMap)
    const validateErrors: number[] = []
    questionIdList.forEach((questionId) => {
      const answer = answersMap[questionId]
      const isEmpty = answer.length === 0
      if (isEmpty) {
        validateErrors.push(Number(questionId))
      }
    })

    if (validateErrors.length === 0) {
      onSendAnswers()
    } else {
      tg.HapticFeedback.impactOccurred('heavy')
      setErrorQuestionIds(validateErrors)
    }
  }

  const { name: title, rating, questions } = test
  const { technology: technologyName, direction: directionName } = testInfo

  return (
    <>
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
        <MenuItemInfo rating={rating} info={[technologyName, directionName]} />
      </Box>
      {getQuestionList(questions)}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={validateHandle}
          sx={{ m: '20px 0', width: '50%', color: button_text_color, backgroundColor: button_color }}
          variant='contained'
        >
          Отправить
        </Button>
      </Box>
    </>
  )
}

export default Test
