import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import useBackButton from '../../hooks/useBackButton'
import { RouteList } from '../../routes/routes'
import Catalog from '../../components/Catalog'
import { ArticleService } from '../../services/ArticleService'
import { TestService } from '../../services/TestService'
import { RenderItemsProps } from '../../components/InfinityScrollList'
import { ArticleType, TestResultType } from '../../types/menuList'
import ArticleCard from '../../components/ArticleCard'
import useTgTheme from '../../hooks/useTgTheme'

const History: FC = () => {
  const { button_color } = useTgTheme()
  const navigate = useNavigate()
  useBackButton()

  const openTestHande = (id: number) => {
    navigate(`/${RouteList.PassedTest}/${id}`)
  }

  const renderTests = (props: RenderItemsProps<TestResultType>) => {
    const { dataList } = props

    return (
      <List component='div'>
        {dataList.map(({ id, name, test_id, counter, percentage }) => {
          const displayValue = `${name} - ${percentage}% (${counter}) раз пройден`

          return (
            <ListItemButton key={id} onClick={() => openTestHande(test_id)} sx={{ borderTop: `1px solid ${button_color}` }}>
              <ListItemText primary={displayValue} />
            </ListItemButton>
          )
        })}
      </List>
    )
  }

  const renderArticles = (props: RenderItemsProps<ArticleType>) => {
    const { dataList } = props

    return dataList.map((article) => <ArticleCard key={article.id} article={article} />)
  }

  return (
    <Box sx={{ pt: '10px' }}>
      <Catalog<TestResultType, ArticleType>
        articlesRequest={ArticleService.getReadArticles}
        testsRequest={TestService.getTestResults}
        renderTests={renderTests}
        renderArticles={renderArticles}
      />
    </Box>
  )
}

export default History
