import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, ListItemButton, ListItemText, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import useTgTheme from '../../hooks/useTgTheme'
import { ARTICLE_KEY, tabsCatalogConfig, TEST_KEY, TabsType, RECOMMENDATION_KEY } from '../../pages/SingleDirection/constants'
import { ArticleType, MenuListType, TestType } from '../../types/menuList'
import Loader from '../Loader'
import MenuList from '../MenuList'
import { RenderItemsProps } from '../InfinityScrollList'
import { RouteList } from '../../routes/routes'
import { IParams } from '../../types/params'
import MenuItemInfo from '../MenuItemInfo'
import useBackButton from '../../hooks/useBackButton'
import { MultiLineEllipsisStyle } from '../../constants/style'
import ArticleCard from '../ArticleCard'

type CatalogProps = {
  getInfoRequest: (id: string) => Promise<MenuListType>
  articlesByFilterRequest: (params: IParams) => Promise<ArticleType[]>
  testsByFilterRequest: (params: IParams) => Promise<TestType[]>
}

const StyledButton = (color: string) =>
  styled(Button)({
    '&:hover': {
      color
    }
  })
const Catalog: FC<CatalogProps> = ({ getInfoRequest, testsByFilterRequest, articlesByFilterRequest }) => {
  const { button_color, button_text_color, text_color, bg_color, link_color } = useTgTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)
  useBackButton()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { name } = await getInfoRequest(id)
        setTitle(name)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <Loader />

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
        <MenuList<ArticleType> requestId={id} activeTab={activeTab} request={articlesByFilterRequest} getItems={renderArticles} />
      ),
      [TEST_KEY]: <MenuList<TestType> requestId={id} activeTab={activeTab} request={testsByFilterRequest} getItems={renderTests} />
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
        {title}
      </Typography>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>{renderTabs()}</Container>
      {renderMenuList()}
    </Box>
  )
}

export default Catalog
