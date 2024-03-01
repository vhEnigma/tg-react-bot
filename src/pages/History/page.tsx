import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import useBackButton from '../../hooks/useBackButton'
import { RouteList } from '../../routes/routes'
import Catalog from '../../components/Catalog'
import { ArticleService } from '../../services/ArticleService'
import { TestService } from '../../services/TestService'
import { RenderItemsProps } from '../../components/InfinityScrollList'
import { ArticleType, TestType } from '../../types/menuList'
import ArticleCard from '../../components/ArticleCard'
import useTgTheme from '../../hooks/useTgTheme'

const History: FC = () => {
  const { button_color } = useTgTheme()
  const navigate = useNavigate()
  useBackButton()

  const openTestHande = (id: number) => {
    navigate(`/${RouteList.PassedTest}/${id}`)
  }

  const renderTests = (props: RenderItemsProps<TestType>) => {
    const { ref, dataList } = props
    const lastIndex = dataList.length - 1

    return (
      <List component='div'>
        {dataList.map(({ id, name }, index) => {
          const displayValue = `${name} - ${0}% (X) раз пройден`
          if (lastIndex === index) {
            return (
              <ListItemButton ref={ref} key={id} onClick={() => openTestHande(id)} sx={{ borderTop: `1px solid ${button_color}` }}>
                <ListItemText primary={displayValue} />
              </ListItemButton>
            )
          }
          return (
            <ListItemButton key={id} onClick={() => openTestHande(id)} sx={{ borderTop: `1px solid ${button_color}` }}>
              <ListItemText primary={displayValue} />
            </ListItemButton>
          )
        })}
      </List>
    )
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
    <Box sx={{ pt: '10px' }}>
      <Catalog
        articlesRequest={ArticleService.getReadArticles}
        testsRequest={TestService.getTestResults}
        renderTests={renderTests}
        renderArticles={renderArticles}
      />
    </Box>
  )
}

export default History
