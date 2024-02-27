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
  const { button_text_color, button_color, bg_color, section_bg_color } = useTgTheme()
  const getTags = () =>
    ['облако1', 'облако2', 'облако3'].map((tag, index) => (
      <Box
        key={index}
        sx={{
          color: button_text_color,
          backgroundColor: button_color,
          borderRadius: '10px',
          p: '5px',
          height: 'fit-content'
        }}
      >
        {tag}
      </Box>
    ))

  const { author, rating, reading_time, topic } = article

  return (
    <Box
      ref={customRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        borderTop: `1px solid ${button_color}`,
        backgroundColor: bg_color,
        p: '10px'
      }}
    >
      <Box
        onClick={onCLick}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          backgroundColor: section_bg_color,
          borderRadius: '5px',
          p: '5px'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography>{author}</Typography>
          <Typography>{topic}</Typography>
        </Box>
        <MenuItemInfo rating={rating} reading_time={reading_time} withTimeEllipsis />
      </Box>
      <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание
      </Typography>
      <Typography>Дата создания: 01.01.0000</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>{getTags()}</Box>
    </Box>
  )
}

export default ArticleCard
