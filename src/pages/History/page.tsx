import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
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

  return <Catalog requestId='' articlesRequest={ArticleService.getReadArticles} testsRequest={TestService.getTestResults} />
}

export default History
