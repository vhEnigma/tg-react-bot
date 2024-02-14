import { FC } from 'react'
import {useTelegram} from "../../hooks/useTelegram.ts";
import {Box, Typography} from "@mui/material";
import useTgTheme from "../../hooks/useTgTheme.ts";

const Root: FC = () => {
  const {user} = useTelegram()
  const {text_color} = useTgTheme()

  const title = `${user.first_name} (${user.username})`
  return <Box>
    <Typography component='h1' sx={{margin: '20px 0', textAlign: 'center', color: text_color}}>
    {title}
  </Typography>
  </Box>
}

export default Root