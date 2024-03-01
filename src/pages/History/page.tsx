import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import useBackButton from '../../hooks/useBackButton'
import { RouteList } from '../../routes/routes'
import Catalog from '../../components/Catalog'
import { ArticleService } from '../../services/ArticleService'
import { TestService } from '../../services/TestService'

const History: FC = () => {
  const navigate = useNavigate()
  useBackButton()

  const openTestHande = (id: number) => {
    navigate(`/${RouteList.PassedTest}/${id}`)
  }

  console.log(openTestHande)

  return (
    <Box sx={{ pt: '10px' }}>
      <Catalog articlesRequest={ArticleService.getReadArticles} testsRequest={TestService.getTestResults} />
    </Box>
  )
}

export default History
