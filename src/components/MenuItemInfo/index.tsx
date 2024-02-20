import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { AccessTime } from '@mui/icons-material'
import StarRateIcon from '@mui/icons-material/StarRate'
import useTgTheme from '../../hooks/useTgTheme'

type MenuItemInfoProps = {
  reading_time: number
  difficulty: number
  rating: number
}

const MenuItemInfo: FC<MenuItemInfoProps> = ({ reading_time, rating, difficulty }) => {
  const { text_color } = useTgTheme()
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Typography sx={{ color: text_color }}>{reading_time} мин.</Typography>
      <AccessTime sx={{ color: text_color }} />
      <Typography sx={{ color: text_color }} component='span'>
        {' '}
        |{' '}
      </Typography>
      <Typography sx={{ color: text_color }} component='span'>
        {' '}
        {difficulty}/{rating}
      </Typography>
      <StarRateIcon sx={{ color: 'yellow' }} />
    </Box>
  )
}

export default MenuItemInfo
