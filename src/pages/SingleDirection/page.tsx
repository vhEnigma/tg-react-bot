import {FC, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {DirectionService} from "../../services/Direction";
import {ArticleType} from "../../types/menuList.ts";
import {Box, Button, Container, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import Loader from "../../components/Loader";
import Search from "../../components/Search";
import useTgTheme from "../../hooks/useTgTheme.ts";
import StarRateIcon from '@mui/icons-material/StarRate';
import {AccessTime} from "@mui/icons-material";

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
      }
      setLoading(false)
    }

    fetchData()
  }, []);

  if (isLoading) return <Loader />
  console.log(articleList)
  const renderTabs = () => {
    return tabsConfig.map((options) => {
      const {id, title, key} = options
      const isActive = key === activeTab
      const backgroundColor = isActive ? button_color : bg_color
      const color = isActive ? button_text_color : link_color
      return <Button key={id} onClick={() => setActiveTab(key)} fullWidth sx={{backgroundColor, color}} variant="contained">{title}</Button>
    })
  }

  // const renderItems = () => {
  //   return articleList.map((item) => {
  //     const {id, direction_id, article_link, author, rating, difficulty, topic, technology_id, reading_time} = item
  //
  //   })
  // }

  return <Box>
    <Typography component='h1' sx={{color: text_color, textAlign: 'center', m: '20px 0', textTransform: 'uppercase'}}>{title}</Typography>
    <Container sx={{display: 'flex', justifyContent: 'space-between', gap: '50px'}}>
      {renderTabs()}
    </Container>
    <Search value={searchValue} setValue={setSearchValue} />
    <Box>
      <List component="div" aria-label="secondary mailbox folder">
      <ListItemButton sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}>
        <ListItemText primary={'article'} />
        <ListItemIcon>
          <Box sx={{display: 'flex', gap: '10px'}}>
            <Typography sx={{color: text_color}}>5 min</Typography>
            <AccessTime sx={{color: text_color}} />
            <Typography component='span'> | </Typography>
            <StarRateIcon sx={{color: 'yellow'}}/>
          </Box>
        </ListItemIcon>
      </ListItemButton>
      </List>
    </Box>
  </Box>
}

export default SingleDirection