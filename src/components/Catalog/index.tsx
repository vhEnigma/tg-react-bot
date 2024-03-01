import React, { FC, ReactNode, useState } from 'react'
import { Box, Button, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import useTgTheme from '../../hooks/useTgTheme'
import { ARTICLE_KEY, tabsCatalogConfig, TEST_KEY, TabsType, RECOMMENDATION_KEY } from '../../pages/SingleDirection/constants'
import { ArticleType, TestType } from '../../types/menuList'
import MenuList from '../MenuList'
import { RenderItemsProps } from '../InfinityScrollList'
import { IParams } from '../../types/params'
import useBackButton from '../../hooks/useBackButton'

type CatalogProps = {
  requestId?: string
  articlesRequest: (params: IParams) => Promise<ArticleType[]>
  testsRequest: (params: IParams) => Promise<TestType[]>
  renderTests: (props: RenderItemsProps<TestType>) => ReactNode
  renderArticles: (props: RenderItemsProps<ArticleType>) => ReactNode
}

const StyledButton = (color: string) =>
  styled(Button)({
    '&:hover': {
      color
    }
  })
const Catalog: FC<CatalogProps> = ({ requestId, testsRequest, articlesRequest, renderTests, renderArticles }) => {
  const { button_color, button_text_color, bg_color, link_color } = useTgTheme()
  const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)
  useBackButton()

  const renderTabs = () =>
    tabsCatalogConfig.map((options) => {
      const { id, title, key } = options
      const isActive = key === activeTab
      const backgroundColor = isActive ? button_color : bg_color
      const color = isActive ? button_text_color : link_color
      const Component = StyledButton(button_text_color)
      return (
        <Component key={id} onClick={() => setActiveTab(key)} fullWidth sx={{ backgroundColor, color }} variant='contained'>
          {title}
        </Component>
      )
    })

  const renderMenuList = () => {
    const menuLists = {
      [ARTICLE_KEY]: (
        <MenuList<ArticleType> requestId={requestId} activeTab={activeTab} request={articlesRequest} getItems={renderArticles} />
      ),
      [TEST_KEY]: <MenuList<TestType> requestId={requestId} activeTab={activeTab} request={testsRequest} getItems={renderTests} />
    }
    if (activeTab === RECOMMENDATION_KEY) return
    return menuLists[activeTab]
  }

  return (
    <Box>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>{renderTabs()}</Container>
      {renderMenuList()}
    </Box>
  )
}

export default Catalog
