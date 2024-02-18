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
import useInfinityScroll from '../../hooks/useInfinityScroll'
import useGetInfo from '../../hooks/tanstack/useGetInfo'
import { PAGE_SIZE } from '../../constants/common'
import useMenuListByFilter from '../../hooks/tanstack/useMenuByFilter'

type GetInfoType = {
  request: (id: string) => Promise<MenuListType>
  queryKey: string
}

type GetArticleByFilter = {
  request: (params: IParamsWithId) => Promise<ResultResponseType<ArticleType>>
  queryKey: string
}

type GetTestByFilter = {
  request: (params: IParamsWithId) => Promise<ResultResponseType<TestType>>
  queryKey: string
}

type LibraryProps = {
  getInfo: GetInfoType
  getArticleByFilter: GetArticleByFilter
  getTestByFilter: GetTestByFilter
}

const Library: FC<LibraryProps> = ({ getInfo, getTestByFilter, getArticleByFilter }) => {
  const { id } = useParams()
  const { button_color, button_text_color, text_color, bg_color, link_color } = useTgTheme()
  const [dataMap, setDataMap] = useState<DataMap>(initDataMap)
  const [isLoader, setLoader] = useState(true)
  const { ref, inView, setStopInfinityScroll, isStopInfinityScroll, downloadedPages, setDownloadedPages } = useInfinityScroll()

  const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)
  const { searchList, setSearchList, setSearchValue, debouncedSearchValue, isSearch, setSearch, searchValue } = useSearch<ItemsUnion>()
  const { data: info } = useGetInfo({ request: getInfo.request, queryKey: getInfo.queryKey, id })
  const { data: articlesList, isSuccess: isSuccessArticles } = useMenuListByFilter<ArticleType>({
    request: getArticleByFilter.request,
    params: { id, page: downloadedPages },
    queryKey: getArticleByFilter.queryKey
  })
  // const { data: testsList, isSuccess: isSuccessTests } = useMenuListByFilter<TestType>({
  //   request: getTestByFilter.request,
  //   params: { id, page: downloadedPages },
  //   queryKey: getTestByFilter.queryKey
  // })

  // const onStopFetchNextPage = () => {
  //
  // }

  useEffect(() => {
    if (!isSuccessArticles) return
    const map: DataMap = { ...dataMap, [activeTab]: [...dataMap[activeTab], ...articlesList] }
    setDataMap(map)
    if (map[activeTab].length < PAGE_SIZE) {
      setStopInfinityScroll(true)
    }
    setLoader(false)
  }, [articlesList])

  useEffect(() => {
    if (inView && !isStopInfinityScroll) {
      setDownloadedPages(downloadedPages + 1)
    }
  }, [inView, isStopInfinityScroll])

  useEffect(() => {
    const findValues = async () => {
      setSearch(true)
      const callbacks = {
        [ARTICLE_KEY]: getArticleByFilter.request,
        [TEST_KEY]: getTestByFilter.request
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

  if (isLoader) return <Loader />

  const handleSwitchTab = (key: TabsType) => {
    setSearchValue('')
    setSearchList(null)
    setDownloadedPages(1)
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

  const renderTests = (array: ItemsUnion, callbackRef: (node: Element | null | undefined) => void) => {
    if (!isTestTypeArray(array)) return
    const lastIndex = array.length - 1

    return array.map((test, index) => {
      const { id, name, rating, difficulty } = test
      const isLastElement = index === lastIndex

      if (isLastElement) {
        return <TestListItem key={id} name={name} rating={rating} difficulty={difficulty} callbackRef={callbackRef} />
      }

      return <TestListItem key={id} name={name} rating={rating} difficulty={difficulty} />
    })
  }

  const renderArticles = (array: ItemsUnion, callbackRef: (node: Element | null | undefined) => void) => {
    if (!isArticleTypeArray(array)) return
    const lastIndex = array.length - 1
    return array.map((article, index) => {
      const { id, rating, topic, reading_time, difficulty } = article
      const isLastElement = index === lastIndex

      if (isLastElement) {
        return (
          <ArticleListItem
            key={id}
            rating={rating}
            topic={topic}
            reading_time={reading_time}
            difficulty={difficulty}
            callbackRef={callbackRef}
          />
        )
      }
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
    return rendersCallback[activeTab](array, ref)
  }

  return (
    <>
      <Box>
        <Typography component='h1' sx={{ color: text_color, textAlign: 'center', m: '20px 0', textTransform: 'uppercase' }}>
          {info?.name}
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
