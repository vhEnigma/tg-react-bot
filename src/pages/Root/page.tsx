import { FC } from 'react'
import {useTelegram} from "../../hooks/useTelegram.ts";
import {Box, Typography} from "@mui/material";

const Root: FC = () => {
  const {user} = useTelegram()

  const title = `${user.first_name} (${user.username})`
  return <Box>
    <Typography component='h1' sx={{textAlign: 'center'}}>
    {title}
  </Typography>
  </Box>
}

export default Root