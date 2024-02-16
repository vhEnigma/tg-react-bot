import {FC, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Container, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import Loader from "../../components/Loader";
import Search from "../../components/Search";
import useTgTheme from "../../hooks/useTgTheme.ts";
import StarRateIcon from '@mui/icons-material/StarRate';
import {AccessTime} from "@mui/icons-material";
import {RouteList} from "../../routes/routes.ts";
import useSearch from "../../hooks/useSearch.ts";
import {DataMap, TabsType} from "../../pages/SingleDirection/types.ts";
import {ARTICLE_KEY, initDataMap, tabsConfig, TEST_KEY} from "../../pages/SingleDirection/constants.ts";
import {ArticleType, ItemsUnion, MenuListType, ResultResponseType, TestType} from "../../types/menuList.ts";
import {IParamsWithId} from "../../types/params.ts";
import NotFound from "../NotFound";
import {isArticleTypeArray, isTestTypeArray} from "../../utils/typeGuards.ts";

type LibraryProps = {
    getInfo: (id: string) => Promise<MenuListType>
    getArticleByFilter: (params: IParamsWithId) => Promise<ResultResponseType<ArticleType>>
    getTestByFilter: (params: IParamsWithId) => Promise<ResultResponseType<TestType>>
}


const Library: FC<LibraryProps>= ({getInfo, getTestByFilter, getArticleByFilter}) => {
    const {id} = useParams()
    const {button_color, button_text_color, text_color, bg_color, link_color} = useTgTheme()
    const [isLoading, setLoading] = useState(false)
    const [dataMap, setDataMap] = useState<DataMap>(initDataMap)
    const [title, setTitle] = useState('')
    const [activeTab, setActiveTab] = useState<TabsType>(ARTICLE_KEY)
    const {searchList, setSearchList, setSearchValue, debouncedSearchValue, isSearch, setSearch, searchValue} = useSearch<ItemsUnion>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            if (id) {
                const {name} = await getInfo(id)
                const {result:articles} = await getArticleByFilter({id})
                const {result: tests} = await getTestByFilter({id})
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

    useEffect(() => {
        const findValues = async () => {
            setSearch(true)
            const callbacks = {
                [ARTICLE_KEY]: getArticleByFilter,
                [TEST_KEY]: getTestByFilter,
            }
            const {result} = await callbacks[activeTab]({id, q: debouncedSearchValue, pageSize: 20})
            setSearchList(result)
            setSearch(false)
        }
        if (debouncedSearchValue) {
            findValues()
        } else {
            setSearchList(null)
        }


    }, [debouncedSearchValue]);

    if (isLoading) return <Loader />

    const handleSwitchTab = (key: TabsType) => {
        setSearchValue('')
        setActiveTab(key)
    }

    const renderTabs = () => {
        return tabsConfig.map((options) => {
            const {id, title, key} = options
            const isActive = key === activeTab
            const backgroundColor = isActive ? button_color : bg_color
            const color = isActive ? button_text_color : link_color
            return <Button key={id} onClick={() => handleSwitchTab(key)} fullWidth sx={{backgroundColor, color}} variant="contained">{title}</Button>
        })
    }

    const renderTests = (array:ItemsUnion) => {
        if (!isTestTypeArray(array)) return
        return array.map((test) => {
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

    const renderArticles = (array:ItemsUnion) => {
        if (!isArticleTypeArray(array)) return
        return array.map((article) => {
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
        if (Array.isArray(searchList) && searchList.length === 0) {
            return <NotFound />
        }

        const rendersCallback = {
            [ARTICLE_KEY]: renderArticles,
            [TEST_KEY]: renderTests,
        }

        const list = dataMap[activeTab]

        const array = searchList ? searchList : list
        return rendersCallback[activeTab](array)
    }

    return <Box>
        <Typography component='h1' sx={{color: text_color, textAlign: 'center', m: '20px 0', textTransform: 'uppercase'}}>{title}</Typography>
        <Container sx={{display: 'flex', justifyContent: 'space-between', gap: '50px'}}>
            {renderTabs()}
        </Container>
        <Search value={searchValue} setValue={setSearchValue} />
        <Box>
            {isSearch ? <Loader /> : <List component="div" aria-label="secondary mailbox folder">
                {renderItems()}
            </List>}
        </Box>
    </Box>
}

export default Library