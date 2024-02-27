import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import MenuItemInfo from '../MenuItemInfo'
import { ArticleType } from '../../types/menuList'
import useTgTheme from '../../hooks/useTgTheme'

type ArticleCardProps = {
  article: ArticleType
  customRef?: (node?: Element | null | undefined) => void
  onCLick: () => void
}

const ArticleCard: FC<ArticleCardProps> = ({ article, customRef, onCLick }) => {
  const { button_color, bg_color } = useTgTheme()

  const { author, rating, reading_time, topic } = article

  return (
    <Box
      ref={customRef}
      onClick={onCLick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        borderTop: `1px solid ${button_color}`,
        backgroundColor: bg_color,
        p: '10px',
        cursor: 'pointer'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography sx={{ fontStyle: 'italic' }}>{author}</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>{topic}</Typography>
        </Box>
        <MenuItemInfo rating={rating} reading_time={reading_time} withTimeEllipsis />
      </Box>
      <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание
      </Typography>
      <Typography sx={{ fontStyle: 'italic' }}>Дата создания: 01.01.0000</Typography>
    </Box>
  )
}

export default ArticleCard
