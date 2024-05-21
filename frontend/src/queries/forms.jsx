import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import api from '../api'

export const useGetForms = () => {
  return useQuery({
    queryKey:['forms'],
    queryFn:async() => {
      const res = await api.get('api/question/question-set/')
      return res.data
    }
  })
}

export const useCreateForm = () => {
  
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn:async(title) => {
      const res = await api.post('api/question/question-set/',{title:title})
      return res.data
    },
    onSuccess:() => {
      queryClient.invalidateQueries(['forms'])
    }
  })
}

export const useUpdateForm = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:async({form}) => {
      const res = api.put(`api/question/question-set/update/${form.id}`,{form})
      return res.data
    },
    onSuccess:queryClient.invalidateQueries(['forms'])
  })
}