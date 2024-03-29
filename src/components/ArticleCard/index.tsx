import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MenuItemInfo from '../MenuItemInfo'
import { ArticleType } from '../../types/menuList'
import useTgTheme from '../../hooks/useTgTheme'
import { RouteList } from '../../routes/routes'
import { MONTHS } from '../../constants/common'

type ArticleCardProps = {
  article: ArticleType
  customRef?: (node?: Element | null | undefined) => void
  withOutCLick?: boolean
}

const ArticleCard: FC<ArticleCardProps> = ({ article, customRef, withOutCLick = false }) => {
  const { button_color, bg_color } = useTgTheme()
  const navigate = useNavigate()

  const { author, rating, reading_time, topic, date_create } = article

  const handleClick = () => {
    if (withOutCLick) return

    navigate(`/${RouteList.Article}/${article.id}`)
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const day = date.getDate()
    const month = MONTHS[date.getMonth()]
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  return (
    <Box
      ref={customRef}
      onClick={handleClick}
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
        <Typography sx={{ fontWeight: 'bold' }}>{topic}</Typography>
        <MenuItemInfo rating={rating} reading_time={reading_time} withTimeEllipsis />
      </Box>
      <Typography
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}
      >
        Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание
        Описание Описание Описание Описание
      </Typography>
      <Typography>{`${author}, ${formatTimestamp(date_create)}`}</Typography>
    </Box>
  )
}

export default ArticleCard
