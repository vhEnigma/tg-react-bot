import {FC, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {DirectionService} from "../../services/Direction";
import {Box, Button, Container, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import Loader from "../../components/Loader";
import Search from "../../components/Search";
import useTgTheme from "../../hooks/useTgTheme.ts";
import StarRateIcon from '@mui/icons-material/StarRate';
import {AccessTime} from "@mui/icons-material";
import {DataMap, TabsType} from "./types.ts";
import {ARTICLE_KEY, initDataMap, tabsConfig, TEST_KEY} from "./constants.ts";
import {RouteList} from "../../routes/routes.ts";


const SingleDirection: FC = () => {
  const {id} = useParams()
  const {button_color, button_text_color, text_color, bg_color, link_color} = useTgTheme()
  const [isLoading, setLoading] = useState(false)
  const [dataMap, setDataMap] = useState<DataMap>(initDataMap)
  const [title, setTitle] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (id) {
        const {name} = await DirectionService.getDirectionInfoRequest(id)
        const {result:articles} = await DirectionService.getArticleListByDirectionRequest({id})
        const {result: tests} = await DirectionService.getTestListByDirectionRequest({id})
        setTitle(name)
        const dataMap = {
          [ARTICLE_KEY]: articles,
          [TEST_KEY]: tests
        }
        setDataMap(dataMap)
      }
      setLoading(false)
    }

    fetchData()
  }, []);

  if (isLoading) return <Loader />

  const renderTabs = () => {
    return tabsConfig.map((options) => {
      const {id, title, key} = options
      const isActive = key === activeTab
      const backgroundColor = isActive ? button_color : bg_color
      const color = isActive ? button_text_color : link_color
      return <Button key={id} onClick={() => setActiveTab(key)} fullWidth sx={{backgroundColor, color}} variant="contained">{title}</Button>
    })
  }

  const renderTests = () => {
    return dataMap[TEST_KEY].map((test) => {
      const {id, name, rating, difficulty} = test
      return <ListItemButton key={id} onClick={() => navigate(`/${RouteList
          .Test}`)} sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}>
    <ListItemText primary={name} />
      <ListItemIcon>
        <Box sx={{display: 'flex', gap: '10px'}}>
          <Typography sx={{color: text_color}} component='span'> {difficulty}/{rating}</Typography>
          <StarRateIcon sx={{color: 'yellow'}}/>
        </Box>
      </ListItemIcon>
    </ListItemButton>
    })
  }

  const renderArticles = () => {
    return dataMap[ARTICLE_KEY].map((article) => {
      const {id, rating, topic, reading_time, difficulty} = article
      return <ListItemButton onClick={() => navigate(`/${RouteList.Article}`)} key={id} sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}>
        <ListItemText primary={topic} />
        <ListItemIcon>
          <Box sx={{display: 'flex', gap: '10px'}}>
            <Typography sx={{color: text_color}}>{reading_time} мин.</Typography>
            <AccessTime sx={{color: text_color}} />
            <Typography sx={{color: text_color}} component='span'> | </Typography>
            <Typography sx={{color: text_color}} component='span'> {difficulty}/{rating}</Typography>
            <StarRateIcon sx={{color: 'yellow'}}/>
          </Box>
        </ListItemIcon>
      </ListItemButton>
    })
  }

  const renderItems = () => {
    const rendersCallback = {
      [ARTICLE_KEY]: renderArticles,
      [TEST_KEY]: renderTests,
    }
    return rendersCallback[activeTab]()
  }

  return <Box>
    <Typography component='h1' sx={{color: text_color, textAlign: 'center', m: '20px 0', textTransform: 'uppercase'}}>{title}</Typography>
    <Container sx={{display: 'flex', justifyContent: 'space-between', gap: '50px'}}>
      {renderTabs()}
    </Container>
    <Search value={searchValue} setValue={setSearchValue} />
    <Box>
      <List component="div" aria-label="secondary mailbox folder">
        {renderItems()}
      </List>
    </Box>
  </Box>
}

export default SingleDirection