import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants/tanstack'
import { UserService } from '../../services/User'
import { TokenService } from '../../services/TokenService'

const useLoginUser = (tgData: string) => {
  const { data: token, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.user.loginUser, tgData],
    queryFn: () => UserService.loginUser(tgData),
    select: (data) => data.token
  })

  if (token) {
    TokenService.saveToken(token)
  }

  return { isLoading }
}

export default useLoginUser
