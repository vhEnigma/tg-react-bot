import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { AccessTime } from '@mui/icons-material'
import StarRateIcon from '@mui/icons-material/StarRate'
import useTgTheme from '../../hooks/useTgTheme'

type MenuItemInfoProps = {
  rating: number
  reading_time?: number
  info?: string[]
}

const ellipsisStyle = { overflow: 'hidden', whiteSpace: 'no-wrap', textOverflow: 'ellipsis' }

const MenuItemInfo: FC<MenuItemInfoProps> = ({ reading_time, rating, info }) => {
  const { text_color } = useTgTheme()

  const getInfo = (array?: string[]) => {
    if (Array.isArray(array)) {
      return array.map((item, index) => (
        <Typography key={index} sx={{ color: text_color }}>
          {item}&#160;|&#160;
        </Typography>
      ))
    }

    return ''
  }

  const getReadingTime = () => {
    if (reading_time) {
      return (
        <>
          <Typography
            sx={{
              color: text_color,
              ...ellipsisStyle,
              minWidth: '48px',
              maxWidth: '48px'
            }}
          >
            {reading_time} мин.
          </Typography>
          <AccessTime sx={{ color: text_color }} />
          <Typography sx={{ color: text_color }}> | </Typography>
        </>
      )
    }

    return ''
  }
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      {getInfo(info)}
      {getReadingTime()}
      <Typography sx={{ color: text_color, ...ellipsisStyle, minWidth: '40px', maxWidth: '40px' }} component='span'>
        {rating}/5
      </Typography>
      <StarRateIcon sx={{ color: 'yellow' }} />
    </Box>
  )
}

export default MenuItemInfo
