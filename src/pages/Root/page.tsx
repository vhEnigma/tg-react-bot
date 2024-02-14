import { FC } from 'react'
import {useTelegram} from "../../hooks/useTelegram.ts";

type RootProps = {}

const Root: FC<RootProps> = () => {
  const {tg} = useTelegram()
  return <>
    {tg.initDataUnsafe.user.first_name}
  </>
}

export default Root