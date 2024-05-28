import { useQuery,useMutation } from '@tanstack/react-query'

import api from '../api.jsx'

export const useCreateResponse = () => {
  return useMutation({
    mutationFn:async(response) => {
      const res = await api.post('api/response/',response)
      return res.data
    }
  })
}

export const useGetResponseById = (id) => {
  return useQuery({
    queryKey:['response',id],
    queryFn:async() => {
      const res = await api.get(`api/response/${id}`)
      return res.data
    }
  })
}