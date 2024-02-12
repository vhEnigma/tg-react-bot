import { FC } from 'react'
import { TextField } from '@mui/material'

type SearchProps = {}

const Search: FC<SearchProps> = () => {
  return <>
    <TextField sx={{ mt: 2 }} fullWidth id="outlined-basic" label="Поиск" variant="outlined" />
  </>
}

export default Search