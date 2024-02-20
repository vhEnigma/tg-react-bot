import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Rating, Typography } from '@mui/material'
import { ArticleType } from '../../types/menuList'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import { openInNewTab } from '../../utils/common'

const Article: FC = () => {
  const { button_color, button_text_color, text_color } = useTgTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [article, setArticle] = useState<ArticleType>()
  const [userRating, setUserRating] = useState(0)

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetch = async () => {
      // const response = await ArticleService.getSingleArticle({ id })
      const response: ArticleType = {
        id: 1,
        topic: 'Статья1',
        author: 'автор',
        reading_time: 5,
        article_link:
          'https://telegraf.news/world-news/davajte-perestanem-nyt-premer-niderlandov-prizval-liderov-evropy-gotovitsya-k-pobede-trampa/',
        rating: 3,
        difficulty: 5,
        technology_id: 1,
        direction_id: 1
      }
      setArticle(response)
      setLoading(false)
    }

    if (id) {
      fetch()
    }
  }, [])

  if (isLoading || !article) return <Loader />

  const handleChangeRating = (event: SyntheticEvent<Element, Event>, newValue: number | null) => {
    if (!newValue) return
    setUserRating(newValue)
  }

  const { topic: title, author, reading_time, rating, difficulty, article_link } = article
  const subtitle = `${author} | ${reading_time} мин | ${rating}/${difficulty}`

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
      <Box sx={{ margin: '0 auto', textAlign: 'center' }}>
        <Typography component='span' sx={{ color: text_color }}>
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ m: '20px auto', width: '50%' }}>
        <Button
          onClick={() => openInNewTab(article_link)}
          fullWidth
          sx={{ backgroundColor: button_color, color: button_text_color }}
          variant='contained'
        >
          Читать статью
        </Button>
      </Box>
      <Box sx={{ m: '0 auto' }}>
        <Rating name='simple-controlled' value={userRating} onChange={handleChangeRating} />
      </Box>
    </>
  )
}

export default Article
