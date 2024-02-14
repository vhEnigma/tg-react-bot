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
  const {bg_color, text_color, section_bg_color,} = theme.palette.customColors
  const color = bg_color.main

  return <>
    <TextField value={value} onChange={onChange} InputLabelProps={{style:{color: text_color.main}}} InputProps={{style:{color: text_color.main, backgroundColor: section_bg_color.main}}} sx={{ mt: 2, borderColor: color, backgroundColor: color }} fullWidth id="outlined-basic"
               label="Поиск" variant="outlined" />
  </>
}

export default Search