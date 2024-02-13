import { FC } from 'react'
import { TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Search: FC = () => {
  const theme = useTheme()
  return <>
    <TextField sx={{ mt: 2, borderColor: theme.palette.customColors.bgColor }} fullWidth id="outlined-basic"
               label="Поиск" variant="outlined" />
  </>
}

export default Search