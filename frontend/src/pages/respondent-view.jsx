import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useGetFormById } from '../queries/forms.jsx'

import AnswerForm from '../component/answerform.jsx'

import api from '../api.jsx'

import Loader from '../component/loader.jsx'

import './respondent-view.css'

function RespondentView(){
  
  const {id:formId} = useParams()
  
  const formData = useGetFormById(formId)
  
  if (formData.isLoading) {
    return <Loader />
  }
  
  return <AnswerForm formData={formData.data}/>
  
}

export default RespondentView;