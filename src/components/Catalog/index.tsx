import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, ListItemButton, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'
import useTgTheme from '../../hooks/useTgTheme'
import { ARTICLE_KEY, tabsCatalogConfig, TEST_KEY, TabsType, RECOMMENDATION_KEY } from '../../pages/SingleDirection/constants'
import { ArticleType, TestType } from '../../types/menuList'
import MenuList from '../MenuList'
import { RenderItemsProps } from '../InfinityScrollList'
import { RouteList } from '../../routes/routes'
import { IParams } from '../../types/params'
import MenuItemInfo from '../MenuItemInfo'
import useBackButton from '../../hooks/useBackButton'
import { MultiLineEllipsisStyle } from '../../constants/style'
import ArticleCard from '../ArticleCard'

type CatalogProps = {
  requestId?: string
  articlesRequest: (params: IParams) => Promise<ArticleType[]>
  testsRequest: (params: IParams) => Promise<TestType[]>
}

const StyledButton = (color: string) =>
  styled(Button)({
    '&:hover': {
      color
    }
  })
const Catalog: FC<CatalogProps> = ({ requestId, testsRequest, articlesRequest }) => {
  const { button_color, button_text_color, bg_color, link_color } = useTgTheme()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)
  useBackButton()

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
    return dataList.map((test, index) => {
      const { id, name, rating } = test
      const content = (
        <>
          <ListItemText sx={MultiLineEllipsisStyle} primary={name} />
          <MenuItemInfo rating={rating} />
        </>
      )

      if (lastIndex === index) {
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
    return dataList.map((article, index) => {
      if (lastIndex === index) {
        return (
          <ArticleCard onCLick={() => navigate(`/${RouteList.Article}/${article.id}`)} key={article.id} customRef={ref} article={article} />
        )
      }
      return <ArticleCard onCLick={() => navigate(`/${RouteList.Article}/${article.id}`)} key={article.id} article={article} />
    })
  }

  const renderMenuList = () => {
    const menuLists = {
      [ARTICLE_KEY]: (
        <MenuList<ArticleType> requestId={requestId} activeTab={activeTab} request={articlesRequest} getItems={renderArticles} />
      ),
      [TEST_KEY]: <MenuList<TestType> requestId={requestId} activeTab={activeTab} request={testsRequest} getItems={renderTests} />
    }
    if (activeTab === RECOMMENDATION_KEY) return
    return menuLists[activeTab]
  }

  return (
    <Box>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>{renderTabs()}</Container>
      {renderMenuList()}
    </Box>
  )
}

export default Catalog
