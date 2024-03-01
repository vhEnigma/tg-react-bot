import React, { FC } from 'react'
import { List } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useBackButton from '../../hooks/useBackButton'
import { RouteList } from '../../routes/routes'

const History: FC = () => {
  const navigate = useNavigate()
  useBackButton()

  const openTestHande = (id: number) => {
    navigate(`/${RouteList.PassedTest}/${id}`)
  }

  console.log(openTestHande)

  return (
    <List component='div' aria-label='secondary mailbox folder' />

    // <Catalog //todo added single request for test results and readed article
    //         articlesRequest={DirectionService.getArticleListByDirectionRequest}
    //         testsRequest={DirectionService.getTestListByDirectionRequest}
    //       />
  )
}

export default History
