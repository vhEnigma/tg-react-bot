import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Typography, Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ArticleType } from '../../types/menuList'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import { openInNewTab } from '../../utils/common'
import { ArticleService } from '../../services/ArticleService'
import MenuItemInfo from '../../components/MenuItemInfo'
import CustomRating from '../../components/CustomRating'
import useBackButton from '../../hooks/useBackButton'

const Article: FC = () => {
  const { button_color, button_text_color, text_color, bg_color } = useTgTheme()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [article, setArticle] = useState<ArticleType>()
  const [userRating, setUserRating] = useState(0)
  useBackButton()

  useEffect(() => {
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

  const handleChangeRating = async (_: SyntheticEvent<Element, Event>, newValue: number | null) => {
    if (!newValue || !id) return
    setUserRating(newValue)

    await ArticleService.setRating(id, newValue)
  }

  const { topic: title, author, reading_time, rating, article_link } = article

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
        <Accordion sx={{ backgroundColor: bg_color, color: text_color }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2-content' id='panel2-header'>
            <Typography>Подробнее</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText primary='Автор:' secondary={author} />
              </ListItem>
              <ListItem>
                <ListItemText primary='Время чтения' secondary={reading_time} />
              </ListItem>
              <ListItem>
                <ListItemText primary='Рейтинг' secondary={rating} />
              </ListItem>
              <ListItem>
                <ListItemText primary='Дата создания' secondary='01.01.1970' />
              </ListItem>
              <ListItem>
                <ListItemText primary='Дата редактирования' secondary='01.01.1970' />
              </ListItem>
            </List>
            <MenuItemInfo info={[author]} rating={rating} reading_time={reading_time} withTimeEllipsis />

            <Typography>Дата создания : 01.01.1970 Дата Редактирования: 01.01.1970</Typography>
          </AccordionDetails>
        </Accordion>
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
