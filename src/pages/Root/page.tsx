import { FC } from 'react'
import {useTelegram} from "../../hooks/useTelegram.ts";
import {Box, Typography} from "@mui/material";

const Root: FC = () => {
  const {tg} = useTelegram()
  return <Box>
    <Typography component='h1' sx={{m: '0 auto'}}>
    {tg.initDataUnsafe.user.first_name}
  </Typography>
  </Box>
}

export default Root