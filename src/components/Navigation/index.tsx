import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CorporateFareRounded from '@mui/icons-material/CorporateFareRounded'
import GroupRounded from '@mui/icons-material/GroupRounded'
import HomeRounded from '@mui/icons-material/HomeRounded'
import { Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { FC, useState } from 'react'
import { RouteList } from '../../routes/routes.ts'

const tabsConfig = [
  {
    id: 1,
    route: RouteList.Root,
    label: 'Главная',
    IconComponent: HomeRounded
  },
  {
    id: 2,
    route: RouteList.Directions,
    label: 'Направления',
    IconComponent: GroupRounded
  },
  {
    id: 3,
    route: RouteList.Technology,
    label: 'Технологии',
    IconComponent: CorporateFareRounded
  }
]

export const Navigation: FC = () => {
  const theme = useTheme()

  const [value, setValue] = useState(0)

  const getTabs = () => {
    return tabsConfig.map((tab) => (
      <BottomNavigationAction
        key={tab.id}
        component={Link}
        to={tab.route}
        sx={{
          '& .Mui-selected': { color: 'primary' },
          color: theme.palette.customColors.text_color.main
        }}
        label={tab.label}
        icon={<tab.IconComponent />}
      />
    ))
  }

  return (
    <Paper>
      <BottomNavigation
        component={'nav'}
        showLabels
        sx={{ backgroundColor: theme.palette.customColors.bg_color.main }}
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)
        }}>
        {getTabs()}
      </BottomNavigation>
    </Paper>
  )
}
