import { useQuery } from '@tanstack/react-query'
import { DirectionService } from '../services/Direction'


export const useDirections = (page?: number) => {
  return useQuery({
    queryKey: ['directions', page],
    queryFn: () => DirectionService.listDirectionRequest(page),
    staleTime: 5000
  })
}
