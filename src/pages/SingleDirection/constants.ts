import {DataMap, TabsType} from "./types.ts";

export const ARTICLE_KEY = 'article'
export const TEST_KEY = 'tests'

type TabsCOnfigType = {
    id:number
    title: string
    key: TabsType
}


export const tabsConfig:TabsCOnfigType[] = [
    {
        id: 1,
        title: 'Статьи',
        key: ARTICLE_KEY
    },
    {
        id: 2,
        title: 'Тесты',
        key: TEST_KEY
    }
]


export const initDataMap:DataMap = {
    [ARTICLE_KEY]: [],
    [TEST_KEY]: []
}