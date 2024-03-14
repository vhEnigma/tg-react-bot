export const ARTICLE_KEY = 'course'
export const TEST_KEY = 'tests'

export type TabsType = typeof ARTICLE_KEY | typeof TEST_KEY | typeof RECOMMENDATION_KEY

export const RECOMMENDATION_KEY = 'recommendation'

type TabsConfigType = {
    id: number
    title: string
    key: TabsType
}

export const tabsCatalogConfig: TabsConfigType[] = [
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

export const tabsArticleAssociatedConfig: TabsConfigType[] = [
    {
        id: 1,
        title: 'Статьи',
        key: ARTICLE_KEY
    },
    {
        id: 2,
        title: 'Тесты',
        key: TEST_KEY
    },
    {
        id: 3,
        title: 'Подбор',
        key: RECOMMENDATION_KEY
    }
]
