import { useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

import Loader from '../component/loader.jsx'
import AnswerForm from '../component/answerform.jsx'

import api from '../api.jsx'
import { getFormResponse } from '../fetchers/form-response.jsx'

function Result(){
  
  const {formId,responseId} = useParams()
  
  const { data, isLoading, isError } = useQuery({
    queryKey:['formId','responseId'],
    queryFn:() => getFormResponse({formId,responseId})
  })
  
  if (isLoading) return <Loader />
  
  console.log(data)
  
  return <AnswerForm formData={data.formData} 
  responseData={data.responseData} />
  
}

export default Result;