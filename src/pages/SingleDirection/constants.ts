import {DataMap} from "./types.ts";

export const ARTICLE_KEY = 'article'
export const TEST_KEY = 'tests'


export const tabsConfig = [
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
] as const


export const initDataMap:DataMap = {
    [ARTICLE_KEY]: [],
    [TEST_KEY]: []
}