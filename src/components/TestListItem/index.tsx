import { FC } from 'react'
import { Box, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import StarRateIcon from '@mui/icons-material/StarRate'
import { useNavigate } from 'react-router-dom'
import useTgTheme from '../../hooks/useTgTheme'
import { RouteList } from '../../routes/routes'

type TestListItemProps = {
  name: string
  difficulty: number
  rating: number
}

const TestListItem: FC<TestListItemProps> = ({ name, rating, difficulty }) => {
  const { button_color, bg_color, text_color } = useTgTheme()
  const navigate = useNavigate()

  return (
    <ListItemButton
      onClick={() => navigate(`/${RouteList.Test}`)}
      sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}
    >
      <ListItemText primary={name} />
      <ListItemIcon>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography sx={{ color: text_color }} component='span'>
            {' '}
            {difficulty}/{rating}
          </Typography>
          <StarRateIcon sx={{ color: 'yellow' }} />
        </Box>
      </ListItemIcon>
    </ListItemButton>
  )
}

export default TestListItem
