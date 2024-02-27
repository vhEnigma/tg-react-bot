import React, { FC } from 'react'
import { ListItemText, ListItemButton, List } from '@mui/material'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'
import useUserInfo from '../../hooks/useUserInfo'
import { useTelegram } from '../../hooks/useTelegram'
import useBackButton from '../../hooks/useBackButton'

const History: FC = () => {
  const { user } = useTelegram()
  const { button_color } = useTgTheme()
  const { userInfo, isLoading } = useUserInfo(user.id)
  useBackButton()

  if (isLoading || !userInfo) {
    return <Loader />
  }

  const getTestList = () =>
    userInfo.test_results.map(({ id, result, name }) => {
      const displayValue = `${name} - ${result}% (X) раз пройден`
      return (
        <ListItemButton key={id} sx={{ borderTop: `1px solid ${button_color}` }}>
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
