import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api'

function useGetQuestions({formId}){
  return useQuery({
    queryKey:['questions'],
    queryFn:async() => {
      const res = api.get('api/questions/form-questions/',
      params:{
        formId:formId
      })
    }
  })
}