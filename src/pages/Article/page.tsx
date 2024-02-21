import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { ArticleType } from '../../types/menuList'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import { openInNewTab } from '../../utils/common'
import { ArticleService } from '../../services/ArticleService'
import MenuItemInfo from '../../components/MenuItemInfo'
import CustomRating from '../../components/CustomRating'
import { useTelegram } from '../../hooks/useTelegram'

const Article: FC = () => {
  const { tg } = useTelegram()
  const { button_color, button_text_color, text_color } = useTgTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [article, setArticle] = useState<ArticleType>()
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {
    if (tg.ready()) {
      tg.backButton.show()
    }
    const fetch = async () => {
      if (!id) return
      const response = await ArticleService.getSingleArticle(id)
      setUserRating(response.rating)
      setArticle(response)
      setLoading(false)
    }

    fetch()
  }, [])

  if (isLoading || !article) return <Loader />

  const handleBack = () => {
    navigate(-1)
  }

  const handleChangeRating = async (_: SyntheticEvent<Element, Event>, newValue: number | null) => {
    if (!newValue || !id) return
    setUserRating(newValue)

    await ArticleService.setRating(id, newValue)
  }

  const { topic: title, author, reading_time, rating, article_link } = article

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
        <MenuItemInfo author={author} rating={rating} reading_time={reading_time} />
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
      <CustomRating rating={userRating} onChange={handleChangeRating} />
    </>
  )
}

export default Article
