import {FC, useEffect, useState} from 'react'
import {Box, List, ListItemButton, ListItemText} from '@mui/material'
import Search from '../../components/Search'
import Loader from "../../components/Loader";
import {MenuListType} from "../../types/menuList.ts";
import useTgTheme from "../../hooks/useTgTheme.ts";
import {useNavigate} from "react-router-dom";
import {IParams} from "../../types/params.ts";
import useSearch from "../../hooks/useSearch.ts";
import NotFound from "../NotFound";
import useInfinityScroll from "../../hooks/useInfinityScroll.ts";
import {calcLoaderWrapperHeight} from "../../utils/style.ts";

type DirectionsProps = {
    callback:(params: IParams) => Promise<MenuListType[]>
    route: string
}

const MenuList: FC<DirectionsProps> = ({route, callback}) => {
    const {ref, inView, setStopInfinityScroll, isStopInfinityScroll, downloadedPages, setDownloadedPages} = useInfinityScroll()
    const {button_color, } = useTgTheme()
    const [isLoading, setLoading] = useState(true)
    const [renderList, setRenderList] = useState<MenuListType[]>([])
    const {searchList, setSearchList, setSearchValue, debouncedSearchValue, isSearch, setSearch, searchValue} = useSearch<MenuListType[]>()
    const navigate = useNavigate()

    const fetchList = async () => {
        const response = await callback({page:downloadedPages})
        setRenderList([...renderList, ...response])
        setLoading(false)
        if (response.length === 0) {
            setStopInfinityScroll(true)
            return
        }

        setDownloadedPages(downloadedPages + 1)
    }

    useEffect(() => {
        fetchList()
    }, []);

    useEffect(() => {
        if (inView && !isStopInfinityScroll) {
            fetchList()
        }
    }, [inView])

    useEffect(() => {
        const findValues = async () => {
            setSearch(true)
            const response = await callback({q: debouncedSearchValue, pageSize: 1000})
            setSearchList(response)
            setSearch(false)
        }
        if (debouncedSearchValue) {
            findValues()
        } else {
            setSearchList(null)
        }


    }, [debouncedSearchValue]);

    if (isLoading) return <Loader />

    const openItemHandle = (id: number) => {
        navigate(`/${route}/${id}`)
    }
    const getDirections = () => {
        if (Array.isArray(searchList) && searchList.length === 0) {
            return <NotFound />
        }

        const array = searchList ? searchList : renderList
        const lastIndex = array.length - 1
        return array.map(({ id, name }, index) => {
            const isLastElement = index === lastIndex
            const opacity = inView && !isStopInfinityScroll ? 0.3 : 1
            if (isLastElement) {
                return <ListItemButton ref={ref} onClick={() => openItemHandle(id)} key={id}
                sx={{ borderTop: `1px solid ${button_color}`, opacity }}>
                <ListItemText primary={name} />
                </ListItemButton>
            }
            return <ListItemButton onClick={() => openItemHandle(id)} key={id}
            sx={{ borderTop: `1px solid ${button_color}`, opacity }}>
            <ListItemText primary={name} />
            </ListItemButton>

        })
    }

    return <>
        <Box>
            <Search value={searchValue} setValue={setSearchValue}/>
        </Box>
        <Box sx={{height: calcLoaderWrapperHeight(72)}}>
        {isSearch ? <Loader /> : <List component="div" aria-label="secondary mailbox folder">
            {getDirections()}
        </List>}
        </Box>
    </>
}

export default MenuList