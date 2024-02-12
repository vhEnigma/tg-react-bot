import { FC } from 'react'
import { Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { RouteList } from '../../routes/routes.ts'


const styles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

const ErrorBoundary: FC = () => {
  const navigate = useNavigate()

  const returnHandle = () => {
    navigate(RouteList.Root)
  }

  return <Container sx={styles}>
    <Typography>
      Что-то пошло не так...
    </Typography>
    <Button onClick={returnHandle} variant="contained">На главную</Button>
  </Container>
}

export default ErrorBoundary