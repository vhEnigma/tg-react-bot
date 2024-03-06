import { NAVIGATION_HEIGHT } from '../constants/style'

export const calcLoaderWrapperHeight = (height: number) => `calc(100% - ${NAVIGATION_HEIGHT}px - ${height}px)`
