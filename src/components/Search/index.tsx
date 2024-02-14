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

  const color = theme.palette.customColors.bg_color.main

  return <>
    <TextField value={value} onChange={onChange} InputProps={{style:{color: theme.palette.customColors.text_color.main, backgroundColor: theme.palette.customColors.section_bg_color.main}}} sx={{ mt: 2, borderColor: color, backgroundColor: color }} fullWidth id="outlined-basic"
               label="Поиск" variant="outlined" />
  </>
}

export default Search