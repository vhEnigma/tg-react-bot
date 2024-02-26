import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ArticleType } from '../../types/menuList'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import { openInNewTab } from '../../utils/common'
import { ArticleService } from '../../services/ArticleService'
import CustomRating from '../../components/CustomRating'
import useBackButton from '../../hooks/useBackButton'
import MenuItemInfo from '../../components/MenuItemInfo'

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

  const getTags = () =>
    ['облако1', 'облако2', 'облако3'].map((tag, index) => (
      <Box key={index} sx={{ color: text_color, backgroundColor: bg_color, borderRadius: '10px', p: '5px' }}>
        {tag}
      </Box>
    ))

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
      <Accordion sx={{ backgroundColor: bg_color, color: text_color }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2-content' id='panel2-header'>
          <Typography>Подробнее</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Typography>{author}</Typography>
                <Typography>{title}</Typography>
              </Box>
              <MenuItemInfo rating={rating} reading_time={reading_time} withTimeEllipsis />
            </Box>
            <Box>
              <Box>
                <Typography>Дата создания & Дата редактирования</Typography>
              </Box>
              <Box>{getTags()}</Box>
            </Box>
          </Box>
          {/* <List sx={{ color: text_color }}> */}
          {/*  <ListItem> */}
          {/*    <ListItemText secondaryTypographyProps={{ color: text_color }} primary='Автор:' secondary={author} /> */}
          {/*  </ListItem> */}
          {/*  <ListItem> */}
          {/*    <ListItemText secondaryTypographyProps={{ color: text_color }} primary='Время чтения' secondary={`${reading_time} минут`} /> */}
          {/*  </ListItem> */}
          {/*  <ListItem> */}
          {/*    <ListItemText secondaryTypographyProps={{ color: text_color }} primary='Рейтинг' secondary={`${rating}/5`} /> */}
          {/*  </ListItem> */}
          {/*  <ListItem> */}
          {/*    <ListItemText secondaryTypographyProps={{ color: text_color }} primary='Дата создания' secondary='01.01.1970' /> */}
          {/*  </ListItem> */}
          {/*  <ListItem> */}
          {/*    <ListItemText secondaryTypographyProps={{ color: text_color }} primary='Дата редактирования' secondary='01.01.1970' /> */}
          {/*  </ListItem> */}
          {/* </List> */}
        </AccordionDetails>
      </Accordion>
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
