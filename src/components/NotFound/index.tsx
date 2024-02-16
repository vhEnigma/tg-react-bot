import {FC} from 'react'
import {Typography} from "@mui/material";
import useTgTheme from "../../hooks/useTgTheme.ts";

const NotFound: FC = () => {
    const {text_color} = useTgTheme()
    return <Typography component='p' sx={{textAlign: 'center', color: text_color, mt: '10px'}}>Ничего не найдено.</Typography>
}

export default NotFound