import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ListItemButton, ListItemText, Typography } from '@mui/material'
import { DirectionService } from '../../services/Direction'
import Catalog from '../../components/Catalog'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import { RenderItemsProps } from '../../components/InfinityScrollList'
import { ArticleType, TestType } from '../../types/menuList'
import { MultiLineEllipsisStyle } from '../../constants/style'
import MenuItemInfo from '../../components/MenuItemInfo'
import { RouteList } from '../../routes/routes'
import ArticleCard from '../../components/ArticleCard'

const SingleDirection: FC = () => {
  const { text_color, button_color, bg_color } = useTgTheme()
  const [isLoading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { name } = await DirectionService.getDirectionInfoRequest(id)
        setTitle(name)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading || !id) return <Loader />

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
      <Catalog<TestType, ArticleType>
        queryParams={{ requestId: id }}
        articlesRequest={DirectionService.getArticleListByDirectionRequest}
        testsRequest={DirectionService.getTestListByDirectionRequest}
        renderTests={renderTests}
        renderArticles={renderArticles}
      />
    </>
  )
}

export default SingleDirection
