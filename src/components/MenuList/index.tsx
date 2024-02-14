import {FC, useEffect, useState} from 'react'
import {List, ListItemButton, ListItemText} from '@mui/material'
import Search from '../../components/Search'
import { useTheme } from '@mui/material/styles'
import {useInView} from "react-intersection-observer";
import useDebounce from "../../hooks/useDebounce.ts";
import Loader from "../../components/Loader";
import style from './style.module.css'
import {MenuListType, ParamsMenuListRequest} from "../../types/menuList.ts";



type DirectionsProps = {
    callback:(params: ParamsMenuListRequest) => Promise<MenuListType[]>
}

const MenuList: FC<DirectionsProps> = ({callback}) => {
    const { ref, inView } = useInView({
        threshold: 0,
    });
    const [isStopInfinityScroll, setStopInfinityScroll] = useState(false)
    const theme = useTheme()
    const [downloadedPages, setDownloadedPages] = useState(1)
    const [renderList, setRenderList] = useState<MenuListType[]>([])
    const [searchList, setSearchList] = useState<MenuListType[] | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [isSearch, setSearch] = useState(false)
    const debouncedSearchValue = useDebounce(searchValue, 500);

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
    const getDirections = () => {
        const array = searchList ? searchList : renderList
        const lastIndex = array.length - 1
        return array.map(({ id, name }, index) => {
            const isLastElement = index === lastIndex
            const opacity = inView && !isStopInfinityScroll ? 0.5 : 1
            if (isLastElement) {
                return <ListItemButton ref={ref} key={id}
                sx={{ borderTop: `1px solid ${theme.palette.customColors.button_color.main}`, opacity }}>
                <ListItemText primary={name} />
                </ListItemButton>
            }
            return <ListItemButton key={id}
            sx={{ borderTop: `1px solid ${theme.palette.customColors.button_color.main}`, opacity }}>
            <ListItemText primary={name} />
            </ListItemButton>

        })
    }
    return <>
        <Search value={searchValue} setValue={setSearchValue}/>
        <div className={style.container}>
        {isSearch ? <Loader /> : <List component="div" aria-label="secondary mailbox folder">
            {getDirections()}
        </List>}
        </div>
    </>
}

export default MenuList