import {ArticleType, TestType} from "../types/menuList.ts";

export const isArticleTypeArray = (array: (ArticleType | TestType)[]): array is ArticleType[] =>
    array.every(item => {
        const requiredKeys: (keyof ArticleType)[] = Object.keys(item) as (keyof ArticleType)[];
        return requiredKeys.every(key => key in item);
    });

export const isTestTypeArray = (array: (ArticleType | TestType)[]): array is TestType[] =>
    array.every(item => {
        const requiredKeys: (keyof TestType)[] = Object.keys(item) as (keyof TestType)[];
        return requiredKeys.every(key => key in item);
    });
