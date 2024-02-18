import { FC, PropsWithChildren, Suspense, useEffect } from 'react'
import {Box, Container} from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram.ts'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Loader from '../../components/Loader'
import style from './style.module.css'
// import { UserService } from '../../services/User'
// import { TokenService } from '../../services/TokenService'
import {ThemeProvider} from '@mui/material/styles'
import { createCustomTheme } from '../../utils/theme.ts'
import { Navigation } from '../../components/Navigation'
import {NAVIGATION_HEIGHT} from "../../constants/style.ts";
import useLoginUser from "../../hooks/tanstack/useLoginUser.ts";


const App: FC<PropsWithChildren> = () => {
  const { tg } = useTelegram()
  useLoginUser(tg.initData)

  useEffect(() => {
    // const getToken = async () => {
    //   const { token } = await UserService.loginUserRequest(tg.initData)
    //   if (token) {
    //     TokenService.saveToken(token)
    //   }
    // }
    // getToken()
  }, [])

  const theme = createCustomTheme(tg)

  return (
      <ThemeProvider theme={theme}>
        <Box className={style.container} style={{backgroundColor: theme.palette.customColors.secondary_bg_color.main}}>
          <Container sx={{height: `calc(100vh - ${NAVIGATION_HEIGHT}px)`, overflow: 'auto'}}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </Container>
          <Navigation />
        </Box>
      </ThemeProvider>
  )
}

export default App
