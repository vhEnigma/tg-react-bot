import { FC } from 'react'
import {useTelegram} from "../../hooks/useTelegram.ts";
import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const Root: FC = () => {
  const {user} = useTelegram()
  const {palette:{customColors:{text_color}}} = useTheme()

  const title = `${user.first_name} (${user.username})`
  return <Box>
    <Typography component='h1' sx={{margin: '20px 0', textAlign: 'center', color: text_color.main}}>
    {title}
  </Typography>
  </Box>
}

export default Root