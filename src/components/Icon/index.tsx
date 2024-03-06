import { FC } from 'react'
import { Box } from '@mui/material'

type IconProps = {
  src: string
}

const Icon: FC<IconProps> = ({ src }) => (
  <Box
    component='img'
    sx={{
      borderRadius: '5px',
      height: 30,
      width: 30,
      mr: '10px'
    }}
    alt='icon'
    src={src}
  />
)

export default Icon
