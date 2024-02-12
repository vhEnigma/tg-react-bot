import { useQuery } from '@tanstack/react-query'
import { TechnologyService } from '../services/Technology'

export const useTechnology = (page?: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['technology'],
    queryFn: () => TechnologyService.listTechnologyRequest(page),
    staleTime: 5000
  })

  return {
    data,
    error,
    isLoading
  }
}
