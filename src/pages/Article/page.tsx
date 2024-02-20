import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { ArticleType } from '../../types/menuList'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'

const Article: FC = () => {
  const { button_color, button_text_color, text_color } = useTgTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [article, setArticle] = useState<ArticleType>()

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
  const { topic: title, author, reading_time, rating, difficulty } = article
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
      <Typography component='h1' sx={{ margin: '20px 0 10px 0', textAlign: 'center', color: text_color }}>
        {title}
      </Typography>
      <Box sx={{ margin: '0 auto', textAlign: 'center' }}>
        <Typography component='span' sx={{ color: text_color }}>
          {subtitle}
        </Typography>
      </Box>
    </>
  )
}

export default Article
