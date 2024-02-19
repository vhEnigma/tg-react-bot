import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material'
import useTgTheme from '../../hooks/useTgTheme'
import { ARTICLE_KEY, tabsConfig, TEST_KEY } from '../../pages/SingleDirection/constants'
import { MenuListType } from '../../types/menuList'
import Loader from '../Loader'
import { TabsType } from '../../pages/SingleDirection/types'

type CatalogProps = {
  getInfoRequest: (id: string) => Promise<MenuListType>
}

const Catalog: FC<CatalogProps> = ({ getInfoRequest }) => {
  const { button_color, button_text_color, text_color, bg_color, link_color } = useTgTheme()

  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { name } = await getInfoRequest(id)
        setTitle(name)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <Loader />

  const renderTabs = () =>
    tabsConfig.map((options) => {
      const { id, title, key } = options
      const isActive = key === activeTab
      const backgroundColor = isActive ? button_color : bg_color
      const color = isActive ? button_text_color : link_color
      return (
        <Button key={id} onClick={() => setActiveTab(key)} fullWidth sx={{ backgroundColor, color }} variant='contained'>
          {title}
        </Button>
      )
    })

  const renderMenuList = () => {
    const menuLists = {
      [ARTICLE_KEY]: '1',
      [TEST_KEY]: '2'
    }

    return menuLists[activeTab]
  }

  return (
    <Box>
      <Typography
        component='h1'
        sx={{
          color: text_color,
          textAlign: 'center',
          m: '20px 0',
          textTransform: 'uppercase'
        }}
      >
        {title}
      </Typography>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>{renderTabs()}</Container>
      {renderMenuList()}
    </Box>
  )
}

export default Catalog
