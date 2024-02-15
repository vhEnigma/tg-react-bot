import {FC, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {DirectionService} from "../../services/Direction";
import {ArticleType} from "../../types/menuList.ts";
import {Box, Button, Container, Typography} from "@mui/material";
import Loader from "../../components/Loader";
import Search from "../../components/Search";
import useTgTheme from "../../hooks/useTgTheme.ts";

const tabsConfig = [
  {
    id: 1,
    title: 'Статьи',
    key: 'article'
  },
  {
    id: 2,
    title: 'Тесты',
    key: 'tests'
  }
]

const SingleDirection: FC = () => {
  const {id} = useParams()
  const {button_color, button_text_color, text_color, bg_color, link_color} = useTgTheme()
  const [isLoading, setLoading] = useState(false)
  const [articleList, setArticleList] = useState<ArticleType[]>([])
  const [title, setTitle] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState('article')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (id) {
        const {name} = await DirectionService.getDirectionInfoRequest(id)
        const {result} = await DirectionService.getArticleListByDirectionRequest({id})
        setTitle(name)
        setArticleList(result)
        setLoading(false)
      }
    }

    fetchData()
  }, []);

  if (isLoading) return <Loader />
  console.log(articleList)

  // const renderArticle = () => {
  //   return articleList.map((article) => {
  //     const {id, direction_id, article_link, author, rating, difficulty, topic, technology_id, reading_time} = article
  //
  //   })
  // }

  const renderTabs = () => {
    return tabsConfig.map((options) => {
      const {id, title, key} = options
      const isActive = key === activeTab
      const backgroundColor = isActive ? bg_color : button_color
      const color = isActive ? link_color : button_text_color
      return <Button key={id} onClick={() => setActiveTab(key)} fullWidth sx={{backgroundColor, color}} variant="contained">{title}</Button>
    })
  }

  return <Box>
    <Typography component='h1' sx={{color: text_color, textAlign: 'center', mt: '20px', textTransform: 'uppercase'}}>{title}</Typography>
    <Container sx={{display: 'flex', justifyContent: 'space-between', gap: '50px'}}>
      {renderTabs()}
    </Container>
    <Search value={searchValue} setValue={setSearchValue} />
  </Box>
}

export default SingleDirection