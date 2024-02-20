import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import StarRateIcon from '@mui/icons-material/StarRate'
import useTgTheme from '../../hooks/useTgTheme'
import { ARTICLE_KEY, tabsConfig, TEST_KEY } from '../../pages/SingleDirection/constants'
import { ArticleType, MenuListType, TestType } from '../../types/menuList'
import Loader from '../Loader'
import { TabsType } from '../../pages/SingleDirection/types'
import MenuList from '../MenuList'
import { RenderItemsProps } from '../InfinityScrollList'
import { RouteList } from '../../routes/routes'
import { IParams } from '../../types/params'
import MenuItemInfo from '../MenuItemInfo'

type CatalogProps = {
  getInfoRequest: (id: string) => Promise<MenuListType>
  articlesByFilterRequest: (params: IParams) => Promise<ArticleType[]>
  testsByFilterRequest: (params: IParams) => Promise<TestType[]>
}

const Catalog: FC<CatalogProps> = ({ getInfoRequest, testsByFilterRequest, articlesByFilterRequest }) => {
  const { button_color, button_text_color, text_color, bg_color, link_color } = useTgTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)

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
    tabsConfig.map((options) => {
      const { id, title, key } = options
      const isActive = key === activeTab
      const backgroundColor = isActive ? button_color : bg_color
      const color = isActive ? button_text_color : link_color
      return (
        <Button key={id} onClick={() => setActiveTab(key)} fullWidth sx={{ backgroundColor, color }} variant='contained'>
          {title}
        </Button>
      )
    })

  const renderTests = (props: RenderItemsProps<TestType>) => {
    const { ref, dataList } = props
    const lastIndex = dataList.length - 1
    return dataList.map((test) => {
      const { id, name, rating, difficulty } = test
      const content = (
        <>
          <ListItemText primary={name} />
          <ListItemIcon>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography sx={{ color: text_color }} component='span'>
                {' '}
                {difficulty}/{rating}
              </Typography>
              <StarRateIcon sx={{ color: 'yellow' }} />
            </Box>
          </ListItemIcon>
        </>
      )

      if (lastIndex) {
        return (
          <ListItemButton
            key={id}
            ref={ref}
            onClick={() => navigate(`/${RouteList.Test}`)}
            sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}
          >
            {content}
          </ListItemButton>
        )
      }
      return (
        <ListItemButton
          key={id}
          onClick={() => navigate(`/${RouteList.Test}`)}
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
      const { id, rating, topic, reading_time, difficulty } = article
      const content = (
        <>
          <ListItemText primary={topic} />
          <MenuItemInfo rating={rating} reading_time={reading_time} difficulty={difficulty} />
          <ListItemIcon />
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

  const renderMenuList = () => {
    const menuLists = {
      [ARTICLE_KEY]: (
        <MenuList<ArticleType> requestId={id} activeTab={activeTab} request={articlesByFilterRequest} getItems={renderArticles} />
      ),
      [TEST_KEY]: <MenuList<TestType> requestId={id} activeTab={activeTab} request={testsByFilterRequest} getItems={renderTests} />
    }

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
