import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ButtonGroup,
  ListItemText,
  ListItemButton
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles'
import { ArticleType, TestType } from '../../types/menuList'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import { openInNewTab } from '../../utils/common'
import { ArticleService } from '../../services/ArticleService'
import CustomRating from '../../components/CustomRating'
import useBackButton from '../../hooks/useBackButton'
import ArticleCard from '../../components/ArticleCard'
import { ARTICLE_KEY, RECOMMENDATION_KEY, tabsArticleAssociatedConfig, TabsType, TEST_KEY } from '../SingleDirection/constants'
import MenuList from '../../components/MenuList'
import { RenderItemsProps } from '../../components/InfinityScrollList'
import { MultiLineEllipsisStyle } from '../../constants/style'
import MenuItemInfo from '../../components/MenuItemInfo'
import { RouteList } from '../../routes/routes'

const StyledButton = (color: string) =>
  styled(Button)({
    '&:hover': {
      color
    }
  })

const Article: FC = () => {
  const { button_color, button_text_color, text_color, bg_color, link_color } = useTgTheme()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [article, setArticle] = useState<ArticleType>()
  const [userRating, setUserRating] = useState(0)
  const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)
  const navigate = useNavigate()
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

  const renderTabs = () =>
    tabsArticleAssociatedConfig.map((options) => {
      const { id, title, key } = options
      const isActive = key === activeTab
      const backgroundColor = isActive ? button_color : bg_color
      const color = isActive ? button_text_color : link_color
      const Component = StyledButton(button_text_color)
      return (
        <Component
          key={id}
          onClick={() => setActiveTab(key)}
          fullWidth
          sx={{ backgroundColor, color, fontSize: '12px' }}
          variant='contained'
        >
          {title}
        </Component>
      )
    })

  const renderTests = (props: RenderItemsProps<TestType>) => {
    const { dataList } = props
    return dataList.map((test) => {
      const { id, name, rating } = test

      return (
        <ListItemButton
          key={id}
          onClick={() => navigate(`/${RouteList.Test}/${id}`)}
          sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}
        >
          <ListItemText sx={MultiLineEllipsisStyle} primary={name} />
          <MenuItemInfo rating={rating} />
        </ListItemButton>
      )
    })
  }

  const renderArticles = (props: RenderItemsProps<ArticleType>) => {
    const { dataList } = props
    return dataList.map((article) => <ArticleCard key={article.id} article={article} />)
  }

  const renderMenuList = () => {
    const menuLists = {
      [ARTICLE_KEY]: (
        <MenuList<ArticleType>
          activeTab={activeTab}
          requestId={id}
          request={ArticleService.getAssociatedArticlesByArticle}
          getItems={renderArticles}
        />
      ),
      [TEST_KEY]: (
        <MenuList<TestType>
          activeTab={activeTab}
          requestId={id}
          request={ArticleService.getAssociatedTestByArticle}
          getItems={renderTests}
        />
      ),
      [RECOMMENDATION_KEY]: (
        <MenuList<ArticleType>
          activeTab={activeTab}
          requestId={id}
          request={ArticleService.getAssociatedArticlesByArticle}
          getItems={renderArticles}
        />
      )
    }
    return menuLists[activeTab]
  }

  const openArticleHandle = (article_link: string, id: number) => {
    openInNewTab(article_link)
    ArticleService.setReadArticle(id)
  }

  const { topic, article_link } = article

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
        {topic}
      </Typography>
      <Accordion sx={{ backgroundColor: bg_color, color: text_color }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2-content' id='panel2-header'>
          <Typography>Подробнее</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ArticleCard article={article} withOutCLick />
        </AccordionDetails>
      </Accordion>
      <Box sx={{ m: '20px auto', width: '50%' }}>
        <Button
          onClick={() => openArticleHandle(article_link, article.id)}
          fullWidth
          sx={{ backgroundColor: button_color, color: button_text_color }}
          variant='contained'
        >
          Читать статью
        </Button>
      </Box>
      <CustomRating rating={userRating} onChange={handleChangeRating} />

      <ButtonGroup sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }} variant='contained'>
        {renderTabs()}
      </ButtonGroup>
      {renderMenuList()}
    </>
  )
}

export default Article
