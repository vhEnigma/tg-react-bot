import { FC, PropsWithChildren, Suspense } from 'react'
import {Box, Container} from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram.ts'
import Loader from '../../components/Loader'
import style from './style.module.css'
import {ThemeProvider} from '@mui/material/styles'
import { createCustomTheme } from '../../utils/theme.ts'
import { Navigation } from '../../components/Navigation'
import {NAVIGATION_HEIGHT} from "../../constants/style.ts";
import useLoginUser from "../../hooks/tanstack/useLoginUser.ts";

const styles = {height: `calc(100vh - ${NAVIGATION_HEIGHT}px)`, overflow: 'auto'}

const App: FC<PropsWithChildren> = () => {
    const { tg } = useTelegram()
    const {isLoading} = useLoginUser(tg.initData)

    const theme = createCustomTheme(tg)

    if (isLoading) {
        return <Box sx={styles}>
            <Loader />
        </Box>
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className={style.container} style={{backgroundColor: theme.palette.customColors.secondary_bg_color.main}}>
                <Container sx={styles}>
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
