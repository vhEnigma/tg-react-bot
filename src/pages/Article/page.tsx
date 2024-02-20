import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Rating, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StarOutline } from '@mui/icons-material'
import { ArticleType } from '../../types/menuList'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import { openInNewTab } from '../../utils/common'
import { ArticleService } from '../../services/ArticleService'
import MenuItemInfo from '../../components/MenuItemInfo'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#faaf00'
  },
  '& .MuiRating-iconHover': {
    color: '#f2ba39'
  }
})

const Article: FC = () => {
  const { button_color, button_text_color, text_color, link_color } = useTgTheme()
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
      setUserRating(response.rating)
      setArticle(response)
      setLoading(false)
    }

    if (id) {
      fetch()
    }
  }, [])

  if (isLoading || !article) return <Loader />

  const handleChangeRating = async (_: SyntheticEvent<Element, Event>, newValue: number | null) => {
    if (!newValue || !id) return
    setUserRating(newValue)

    await ArticleService.setRating(id, newValue)
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
        <MenuItemInfo rating={rating} reading_time={reading_time} difficulty={difficulty} />
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
      <Box sx={{ textAlign: 'center' }}>
        <StyledRating
          name='simple-controlled'
          value={userRating}
          onChange={handleChangeRating}
          size='large'
          emptyIcon={<StarOutline sx={{ borderColor: 'red', color: link_color }} fontSize='inherit' />}
        />
      </Box>
    </>
  )
}

export default Article
