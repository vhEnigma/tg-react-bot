import React, { FC, useEffect, useState } from 'react'
import { ListItemButton, ListItemText, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { TechnologyService } from '../../services/Technology'
import Catalog from '../../components/Catalog'
import useTgTheme from '../../hooks/useTgTheme'
import Loader from '../../components/Loader'
import { RenderItemsProps } from '../../components/InfinityScrollList'
import { ArticleType, TestType } from '../../types/menuList'
import { MultiLineEllipsisStyle } from '../../constants/style'
import MenuItemInfo from '../../components/MenuItemInfo'
import { RouteList } from '../../routes/routes'
import ArticleCard from '../../components/ArticleCard'

const SingleTechnology: FC = () => {
  const { text_color, bg_color, button_color } = useTgTheme()
  const [isLoading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { name } = await TechnologyService.getTechnologyInfoRequest(id)
        setTitle(name)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading || !id) return <Loader />

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

  return (
    <>
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
      <Catalog
        requestId={id}
        articlesRequest={TechnologyService.getArticleListByTechnologyRequest}
        testsRequest={TechnologyService.getTestListByTechnologyRequest}
        renderArticles={renderArticles}
        renderTests={renderTests}
      />
    </>
  )
}
export default SingleTechnology
