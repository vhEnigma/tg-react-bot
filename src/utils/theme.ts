import {createTheme} from '@mui/material/styles'

interface CustomColors {
    [key: string]: {
        main: string
        light?: string
        dark?: string
        contrastText?: string
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        customColors: CustomColors
    }

    interface PaletteOptions {
        customColors?: CustomColors
    }
}

interface ThemeParams {
    [key: string]: string
}

export const createCustomTheme = (tg: { themeParams: ThemeParams }) => {
    const customColors: Record<string, { main: string }> = {}
    const colorKeys = Object.keys(tg.themeParams)

    colorKeys.forEach((key) => {
        customColors[key] = {
            main: tg.themeParams[key]
        }
    })

    return createTheme({
        typography: {
            fontFamily: 'OpenSans'
        },
        palette: {
            customColors,
            primary: {
                main: tg.themeParams.button_color
            }
        }
    })
}
