import { FC, PropsWithChildren, Suspense, useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Loader from '../../components/Loader'
import style from './style.module.css'
import { RouteList } from '../../routes/routes.ts'
import AppButton from '../../components/AppButton'
import { UserService } from '../../services/User'


const queryClient = new QueryClient()
const App: FC<PropsWithChildren> = () => {
  const { tg } = useTelegram()
  const navigate = useNavigate()

  useEffect(() => {
    tg.ready()
  }, [])

  useEffect(() => {
    console.log(tg.initData)
    UserService.loginUserRequest(tg.initData)
  })

  // const handleClose = () => {
  //   tg.close()
  // }

  const handleMain = () => {
    navigate(RouteList.Root)
  }

  const handleDirections = () => {
    navigate(RouteList.Directions)
  }

  const handleTechnology = () => {
    navigate(RouteList.Technology)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={style.container}>
        <Container sx={{ flexGrow: 1 }}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
        <Box sx={{ display: 'flex', flexShrink: 0 }}>
          <AppButton title="Главная" handleClick={handleMain} />
          <AppButton title="Направления" handleClick={handleDirections} />
          <AppButton title="Технологии" handleClick={handleTechnology} />
        </Box>
      </div>
    </QueryClientProvider>
  )
}

export default App
