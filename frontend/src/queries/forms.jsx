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
    mutationFn:async({form}) => {
      const res = await api.post('api/question/question-set/',form)
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
      console.log('were sending this...')
      console.log(form)
      const res = await api.put(`api/question/question-set/update/${form.id}`,form)
      console.log(res.data)
      return res.data
    },
    onSuccess:queryClient.invalidateQueries(['forms'])
  })
}