import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, ListItemButton, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import useTgTheme from '../../hooks/useTgTheme'
import { TabsType, ARTICLE_KEY, tabsCatalogConfig, TEST_KEY, RECOMMENDATION_KEY } from '../SingleDirection/constants'
import { RenderItemsProps } from '../../components/InfinityScrollList'
import { ArticleType, TestType } from '../../types/menuList'
import MenuItemInfo from '../../components/MenuItemInfo'
import { RouteList } from '../../routes/routes'
import MenuList from '../../components/MenuList'
import { DirectionService } from '../../services/Direction'

const StyledButton = (color: string) =>
  styled(Button)({
    '&:hover': {
      color
    }
  })

const New: FC = () => {
  const { button_color, button_text_color, text_color, bg_color, link_color } = useTgTheme()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)

  const renderTabs = () =>
    tabsCatalogConfig.map((options) => {
      const { id, title, key } = options
      const isActive = key === activeTab
      const backgroundColor = isActive ? button_color : bg_color
      const color = isActive ? button_text_color : link_color
      const Component = StyledButton(button_text_color)
      return (
        <Component key={id} onClick={() => setActiveTab(key)} fullWidth sx={{ backgroundColor, color }} variant='contained'>
          {title}
        </Component>
      )
    })

  const renderTests = (props: RenderItemsProps<TestType>) => {
    const { ref, dataList } = props
    const lastIndex = dataList.length - 1
    return dataList.map((test) => {
      const { id, name, rating } = test
      const content = (
        <>
          <ListItemText primary={name} />
          <MenuItemInfo rating={rating} />
        </>
      )

      if (lastIndex) {
        return (
          <ListItemButton
            key={id}
            ref={ref}
            onClick={() => navigate(`/${RouteList.Test}/${id}`)}
            sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}
          >
            {content}
          </ListItemButton>
        )
      }
      return (
        <ListItemButton
          key={id}
          onClick={() => navigate(`/${RouteList.Test}/${id}`)}
          sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}
        >
          {content}
        </ListItemButton>
      )
    })
  }

  const renderArticles = (props: RenderItemsProps<ArticleType>) => {
    const { ref, dataList } = props
    const lastIndex = dataList.length - 1
    return dataList.map((article) => {
      const { id, rating, topic, reading_time } = article
      const content = (
        <>
          <ListItemText primary={topic} />
          <MenuItemInfo rating={rating} reading_time={reading_time} />
        </>
      )

      if (lastIndex) {
        return (
          <ListItemButton
            key={id}
            ref={ref}
            onClick={() => navigate(`/${RouteList.Article}/${id}`)}
            sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}
          >
            {content}
          </ListItemButton>
        )
      }
      return (
        <ListItemButton
          key={id}
          onClick={() => navigate(`/${RouteList.Article}/${id}`)}
          sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}
        >
          {content}
        </ListItemButton>
      )
    })
  }
  // todo replace requests and remove prop requestId
  const renderMenuList = () => {
    const menuLists = {
      [ARTICLE_KEY]: (
        <MenuList<ArticleType>
          requestId='1'
          activeTab={activeTab}
          request={DirectionService.getArticleListByDirectionRequest}
          getItems={renderArticles}
        />
      ),
      [TEST_KEY]: (
        <MenuList<TestType>
          requestId='1'
          activeTab={activeTab}
          request={DirectionService.getTestListByDirectionRequest}
          getItems={renderTests}
        />
      )
    }

    if (activeTab === RECOMMENDATION_KEY) return

    return menuLists[activeTab]
  }

  return (
    <Box>
      <Typography
        component='h1'
        sx={{
          color: text_color,
          textAlign: 'center',
          m: '20px 0',
          textTransform: 'uppercase'
        }}
      >
        Новое
      </Typography>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>{renderTabs()}</Container>
      {renderMenuList()}
    </Box>
  )
}

export default New
