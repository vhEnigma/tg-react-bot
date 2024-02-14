import {ChangeEventHandler, Dispatch, FC, SetStateAction} from 'react'
import {TextField} from '@mui/material'
import { useTheme } from '@mui/material/styles'

type SearchProps = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const Search: FC<SearchProps> = ({value, setValue}) => {
  const theme = useTheme()

  const onChange:ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }

  const color = theme.palette.customColors.bgColor.main

  return <>
    <TextField value={value} onChange={onChange} inputProps={{color:color}} sx={{ mt: 2, borderColor: color, color: color }} fullWidth id="outlined-basic"
               label="Поиск" variant="outlined" />
  </>
}

export default Search