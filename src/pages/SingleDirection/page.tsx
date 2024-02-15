import {FC, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {DirectionService} from "../../services/Direction";
import {ArticleType} from "../../types/menuList.ts";
import {Box, Typography} from "@mui/material";
import Loader from "../../components/Loader";


const SingleDirection: FC = () => {
  const {id} = useParams()
  const [isLoading, setLoading] = useState(false)
  const [articleList, setArticleList] = useState<ArticleType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (id) {
        await DirectionService.getDirectionInfoRequest(id)
        const {result} = await DirectionService.getArticleListByDirectionRequest({id})
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
    <Typography component='h1'>{}</Typography>
  </Box>
}

export default SingleDirection