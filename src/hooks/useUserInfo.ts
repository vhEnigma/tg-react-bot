import { useEffect, useState } from 'react'
import { UserService, UserType } from '../services/User'

const useUserInfo = (id: number) => {
  const [userInfo, setUserInfo] = useState<UserType | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const response = await UserService.getUserInfo(id)
      setUserInfo(response)
      setLoading(false)
    }
    fetch()
  }, [])

  return {
    isLoading,
    userInfo
  }
}

export default useUserInfo
