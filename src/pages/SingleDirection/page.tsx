import {FC, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {DirectionService} from "../../services/Direction";
import {ArticleType} from "../../types/menuList.ts";
import {Box, Button, Container, Typography} from "@mui/material";
import Loader from "../../components/Loader";
import Search from "../../components/Search";
import useTgTheme from "../../hooks/useTgTheme.ts";


const SingleDirection: FC = () => {
  const {id} = useParams()
  const {button_color, button_text_color, text_color} = useTgTheme()
  const [isLoading, setLoading] = useState(false)
  const [articleList, setArticleList] = useState<ArticleType[]>([])
  const [title, setTitle] = useState('')
  const [searchValue, setSearchValue] = useState('')

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

  return <Box>
    <Typography component='h1' sx={{color: text_color}}>{title}</Typography>
    <Container>
      <Button sx={{background: button_color, color: button_text_color}} variant="contained">Статьи</Button>
      <Button sx={{background: button_color, color: button_text_color}} variant="contained">Тесты</Button>
    </Container>
    <Search value={searchValue} setValue={setSearchValue} />
  </Box>
}

export default SingleDirection