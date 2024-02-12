import { FC } from 'react'
import { Button } from '@mui/material'

type AppButtonProps = {
  title: string
  handleClick: () => void
}

const AppButton: FC<AppButtonProps> = ({ title, handleClick }) => {
  return <Button sx={{ borderRadius: '0' }} fullWidth onClick={handleClick}
                 variant="contained">{title}</Button>
}

export default AppButton