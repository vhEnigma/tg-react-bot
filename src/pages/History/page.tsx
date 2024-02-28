import React, { FC } from 'react'
import { ListItemText, ListItemButton, List } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import useUserInfo from '../../hooks/useUserInfo'
import { useTelegram } from '../../hooks/useTelegram'
import useBackButton from '../../hooks/useBackButton'
import { RouteList } from '../../routes/routes'

const History: FC = () => {
  const { user } = useTelegram()
  const { button_color } = useTgTheme()
  const { userInfo, isLoading } = useUserInfo(user.id)
  const navigate = useNavigate()
  useBackButton()

  if (isLoading || !userInfo) {
    return <Loader />
  }

  const openTestHande = (id: number) => {
    console.log(id, 'fucking id')
    navigate(`/${RouteList.PassedTest}/${id}`)
  }

  const getTestList = () =>
    userInfo.test_results.map(({ id, result, name }) => {
      const displayValue = `${name} - ${result}% (X) раз пройден`
      return (
        <ListItemButton key={id} onClick={() => openTestHande(id)} sx={{ borderTop: `1px solid ${button_color}` }}>
          <ListItemText primary={displayValue} />
        </ListItemButton>
      )
    })

  return (
    <List component='div' aria-label='secondary mailbox folder'>
      {getTestList()}
    </List>

    // <Catalog //todo added single request for test results and readed article
    //         articlesRequest={DirectionService.getArticleListByDirectionRequest}
    //         testsRequest={DirectionService.getTestListByDirectionRequest}
    //       />
  )
}

export default History
