import {FC, useEffect, useState} from 'react'
import {Box, List, ListItemButton, ListItemText} from '@mui/material'
import Search from '../../components/Search'
import {useInView} from "react-intersection-observer";
import useDebounce from "../../hooks/useDebounce.ts";
import Loader from "../../components/Loader";
import style from './style.module.css'
import {MenuListType, ParamsMenuListRequest} from "../../types/menuList.ts";
import useTgTheme from "../../hooks/useTgTheme.ts";
import {useNavigate} from "react-router-dom";
import {RouteList} from "../../routes/routes.ts";



type DirectionsProps = {
    callback:(params: ParamsMenuListRequest) => Promise<MenuListType[]>
}

const MenuList: FC<DirectionsProps> = ({callback}) => {
    const { ref, inView } = useInView({
        threshold: 0,
    });
    const [isStopInfinityScroll, setStopInfinityScroll] = useState(false)
    const {button_color, } = useTgTheme()
    const [downloadedPages, setDownloadedPages] = useState(1)
    const [renderList, setRenderList] = useState<MenuListType[]>([])
    const [searchList, setSearchList] = useState<MenuListType[] | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [isSearch, setSearch] = useState(false)
    const debouncedSearchValue = useDebounce(searchValue, 500);
    const navigate = useNavigate()

    const fetchList = async () => {

        const response = await callback({page:downloadedPages})
        setRenderList([...renderList, ...response])

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
            const response = await callback({searchValue: debouncedSearchValue, pageSize: 1000})
            setSearchList(response)
            setSearch(false)
        }
        if (debouncedSearchValue) {
            findValues()
        } else {
            setSearchList(null)
        }


    }, [debouncedSearchValue]);

    const openItemHandle = (id: number) => {
        navigate(`${RouteList.Directions}/${id}`)
    }
    const getDirections = () => {
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
            return <ListItemButton key={id}
            sx={{ borderTop: `1px solid ${button_color}`, opacity }}>
            <ListItemText primary={name} />
            </ListItemButton>

        })
    }
    return <>
        <Search value={searchValue} setValue={setSearchValue}/>
        <Box className={style.container}>
        {isSearch ? <Loader /> : <List component="div" aria-label="secondary mailbox folder">
            {getDirections()}
        </List>}
        </Box>
    </>
}

export default MenuList