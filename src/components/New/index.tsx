import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, ListItemButton, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import useTgTheme from '../../hooks/useTgTheme'
import { TabsType, ARTICLE_KEY, tabsCatalogConfig, TEST_KEY, RECOMMENDATION_KEY } from '../../pages/SingleDirection/constants'
import { RenderItemsProps } from '../InfinityScrollList'
import { ArticleType, TestType } from '../../types/menuList'
import MenuItemInfo from '../MenuItemInfo'
import { RouteList } from '../../routes/routes'
import MenuList from '../MenuList'
import { DirectionService } from '../../services/Direction'
import ArticleCard from '../ArticleCard'
import { getIntervalDate } from '../../utils/common'
import { DAY_PERIOD } from '../../constants/common'

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
    const { dataList } = props
    return dataList.map((test) => {
      const { id, name, rating } = test

      return (
        <ListItemButton
          key={id}
          onClick={() => navigate(`/${RouteList.Test}/${id}`)}
          sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}
        >
          <ListItemText primary={name} />
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
    const { to, from } = getIntervalDate(DAY_PERIOD)
    const menuLists = {
      [ARTICLE_KEY]: (
        <MenuList<ArticleType>
          queryParams={{ from, to }}
          activeTab={activeTab}
          request={DirectionService.getArticleListByDirectionRequest}
          getItems={renderArticles}
        />
      ),
      [TEST_KEY]: (
        <MenuList<TestType>
          queryParams={{ from, to }}
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
