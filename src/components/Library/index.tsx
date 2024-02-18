import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Container, List, Typography } from '@mui/material'
import Loader from '../Loader'
import Search from '../Search'
import useTgTheme from '../../hooks/useTgTheme'
import useSearch from '../../hooks/useSearch'
import { DataMap, TabsType } from '../../pages/SingleDirection/types'
import { ARTICLE_KEY, initDataMap, tabsConfig, TEST_KEY } from '../../pages/SingleDirection/constants'
import { ArticleType, ItemsUnion, MenuListType, ResultResponseType, TestType } from '../../types/menuList'
import { IParamsWithId } from '../../types/params'
import NotFound from '../NotFound'
import { isArticleTypeArray, isTestTypeArray } from '../../utils/typeGuards'
import ArticleListItem from '../ArticleListItem'
import TestListItem from '../TestListItem'
import { calcLoaderWrapperHeight } from '../../utils/style'

type LibraryProps = {
  getInfo: (id: string) => Promise<MenuListType>
  getArticleByFilter: (params: IParamsWithId) => Promise<ResultResponseType<ArticleType>>
  getTestByFilter: (params: IParamsWithId) => Promise<ResultResponseType<TestType>>
}

const Library: FC<LibraryProps> = ({ getInfo, getTestByFilter, getArticleByFilter }) => {
  const { id } = useParams()
  const { button_color, button_text_color, text_color, bg_color, link_color } = useTgTheme()
  const [isLoading, setLoading] = useState(true)
  const [dataMap, setDataMap] = useState<DataMap>(initDataMap)
  const [title, setTitle] = useState('')
  const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)
  const { searchList, setSearchList, setSearchValue, debouncedSearchValue, isSearch, setSearch, searchValue } = useSearch<ItemsUnion>()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { name } = await getInfo(id)
        const { result: articles } = await getArticleByFilter({ id })
        const { result: tests } = await getTestByFilter({ id })
        setTitle(name)
        const dataMap: DataMap = {
          [ARTICLE_KEY]: articles,
          [TEST_KEY]: tests
        }
        setDataMap(dataMap)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const findValues = async () => {
      setSearch(true)
      const callbacks = {
        [ARTICLE_KEY]: getArticleByFilter,
        [TEST_KEY]: getTestByFilter
      }
      const { result } = await callbacks[activeTab]({ id, q: debouncedSearchValue, pageSize: 20 })
      setSearchList(result)
      setSearch(false)
    }
    if (debouncedSearchValue) {
      findValues()
    } else {
      setSearchList(null)
    }
  }, [debouncedSearchValue])

  if (isLoading) return <Loader />

  const handleSwitchTab = (key: TabsType) => {
    setSearchValue('')
    setSearchList(null)
    setActiveTab(key)
  }

  const renderTabs = () =>
    tabsConfig.map((options) => {
      const { id, title, key } = options
      const isActive = key === activeTab
      const backgroundColor = isActive ? button_color : bg_color
      const color = isActive ? button_text_color : link_color
      return (
        <Button key={id} onClick={() => handleSwitchTab(key)} fullWidth sx={{ backgroundColor, color }} variant='contained'>
          {title}
        </Button>
      )
    })

  const renderTests = (array: ItemsUnion) => {
    if (!isTestTypeArray(array)) return
    return array.map((test) => {
      const { id, name, rating, difficulty } = test
      return <TestListItem key={id} name={name} rating={rating} difficulty={difficulty} />
    })
  }

  const renderArticles = (array: ItemsUnion) => {
    if (!isArticleTypeArray(array)) return
    return array.map((article) => {
      const { id, rating, topic, reading_time, difficulty } = article
      return <ArticleListItem key={id} rating={rating} topic={topic} reading_time={reading_time} difficulty={difficulty} />
    })
  }

  const renderItems = () => {
    const isNotFound = (Array.isArray(searchList) && searchList.length === 0) || dataMap[activeTab].length === 0
    if (isNotFound) return <NotFound />

    const rendersCallback = {
      [ARTICLE_KEY]: renderArticles,
      [TEST_KEY]: renderTests
    }

    const list = dataMap[activeTab]

    const array = searchList || list
    return rendersCallback[activeTab](array)
  }

  return (
    <>
      <Box>
        <Typography component='h1' sx={{ color: text_color, textAlign: 'center', m: '20px 0', textTransform: 'uppercase' }}>
          {title}
        </Typography>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>{renderTabs()}</Container>
        <Search value={searchValue} setValue={setSearchValue} />
      </Box>
      <Box sx={{ height: calcLoaderWrapperHeight(152) }}>
        {isSearch ? (
          <Loader />
        ) : (
          <List component='div' aria-label='secondary mailbox folder'>
            {renderItems()}
          </List>
        )}
      </Box>
    </>
  )
}

export default Library
