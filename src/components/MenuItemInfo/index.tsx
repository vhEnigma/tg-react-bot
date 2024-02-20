import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { AccessTime } from '@mui/icons-material'
import StarRateIcon from '@mui/icons-material/StarRate'
import useTgTheme from '../../hooks/useTgTheme'

type MenuItemInfoProps = {
  difficulty: number
  rating: number
  reading_time?: number
  author?: string
}

const MenuItemInfo: FC<MenuItemInfoProps> = ({ reading_time, rating, difficulty, author }) => {
  const { text_color } = useTgTheme()

  const getAuthor = () => {
    if (author) {
      return <Typography sx={{ color: text_color }}>{author} | </Typography>
    }

    return ''
  }

  const getReadingTime = () => {
    if (reading_time) {
      return (
        <>
          <Typography sx={{ color: text_color }}>{reading_time} мин.</Typography>
          <AccessTime sx={{ color: text_color }} />
          <Typography sx={{ color: text_color }}> | </Typography>
        </>
      )
    }

    return ''
  }
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      {getAuthor()}
      {getReadingTime()}
      <Typography sx={{ color: text_color }} component='span'>
        {difficulty}/{rating}
      </Typography>
      <StarRateIcon sx={{ color: 'yellow' }} />
    </Box>
  )
}

export default MenuItemInfo
