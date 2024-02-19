export type MenuItemType = Record<string, string | number>

export type MenuListType = {
  id: number
  name: string
}

export type ResultResponseType<T> = {
  page: number
  result: T[]
}

export type ArticleType = {
  id: number
  topic: string
  author: string
  reading_time: number
  article_link: string
  rating: number
  difficulty: number
  technology_id: number
  direction_id: number
}

export type TestType = {
  id: number
  name: string
  difficulty: number
  rating: number
}
