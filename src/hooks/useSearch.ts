import {useState} from "react";
import useDebounce from "./useDebounce.ts";

const useSearch = <T>() => {
    const [searchList, setSearchList] = useState<T | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [isSearch, setSearch] = useState(true)
    const debouncedSearchValue = useDebounce(searchValue, 500);

    return {
        searchList,
        setSearchList,
        searchValue,
        setSearchValue,
        isSearch,
        setSearch,
        debouncedSearchValue
    }
}

export default useSearch