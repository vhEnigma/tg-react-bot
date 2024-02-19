import { FC } from 'react'
import { Button, Container, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { RouteList } from '../../routes/routes'

const styles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

const ErrorBoundary: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  const returnHandle = () => {
    navigate(RouteList.Root)
  }

  return (
    <Container sx={styles}>
      <Typography>Что-то пошло не так...</Typography>
      <Button onClick={returnHandle} variant='contained'>
        На главную
      </Button>
    </Container>
  )
}

export default ErrorBoundary
