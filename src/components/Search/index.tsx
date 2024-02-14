import {ChangeEventHandler, Dispatch, FC, SetStateAction} from 'react'
import {TextField} from '@mui/material'
import useTgTheme from "../../hooks/useTgTheme.ts";

type SearchProps = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const Search: FC<SearchProps> = ({value, setValue}) => {
  const {bg_color, text_color, section_bg_color} = useTgTheme()

  const onChange:ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }

  return <>
    <TextField value={value} onChange={onChange} InputLabelProps={{style:{color: text_color}}} InputProps={{style:{color: text_color, backgroundColor: section_bg_color}}} sx={{ mt: 2, borderColor: bg_color, backgroundColor: bg_color }} fullWidth id="outlined-basic"
               label="Поиск" variant="outlined" />
  </>
}

export default Search