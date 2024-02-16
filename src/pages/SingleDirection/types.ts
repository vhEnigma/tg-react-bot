import {ArticleType, TestType} from "../../types/menuList.ts";
import {ARTICLE_KEY, TEST_KEY} from "./constants.ts";

export type DataMap = {
    [ARTICLE_KEY]: ArticleType[],
    [TEST_KEY]: TestType[]
}

export type TabsType = typeof ARTICLE_KEY | typeof TEST_KEY
