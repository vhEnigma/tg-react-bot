import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CorporateFareRounded from '@mui/icons-material/CorporateFareRounded'
import GroupRounded from '@mui/icons-material/GroupRounded'
import HomeRounded from '@mui/icons-material/HomeRounded'
import { Paper } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { FC, useState } from 'react'
import { RouteList } from '../../routes/routes'
import useTgTheme from '../../hooks/useTgTheme'
import { getActiveRoute } from '../../utils/router'
import { NAVIGATION_HEIGHT } from '../../constants/style'

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
  const { text_color, bg_color } = useTgTheme()
  const { pathname } = useLocation()
  const [value, setValue] = useState(getActiveRoute(pathname))

  const getTabs = () =>
    tabsConfig.map((tab) => (
      <BottomNavigationAction
        key={tab.id}
        component={Link}
        to={tab.route}
        sx={{
          '& .Mui-selected': { color: 'primary' },
          color: text_color
        }}
        label={tab.label}
        icon={<tab.IconComponent />}
      />
    ))

  return (
    <Paper sx={{ height: `${NAVIGATION_HEIGHT}px` }}>
      <BottomNavigation
        component='nav'
        showLabels
        sx={{ backgroundColor: bg_color }}
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)
        }}
      >
        {getTabs()}
      </BottomNavigation>
    </Paper>
  )
}
