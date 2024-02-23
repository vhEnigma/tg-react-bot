import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from './useTelegram'

const useBackButton = () => {
  const { tg } = useTelegram()
  const navigate = useNavigate()

  useEffect(() => {
    tg.BackButton.show()
    tg.BackButton.onClick(() => navigate(-1))

    return () => {
      tg.BackButton.hide()
    }
  }, [])
}

export default useBackButton
