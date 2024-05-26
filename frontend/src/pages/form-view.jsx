import Form from '../component/form.jsx'
import Loader from '../component/loader.jsx'
import BackHeader from '../component/backheader.jsx'

import { useQueryClient } from '@tanstack/react-query'
import { useGetForms } from '../queries/forms.jsx'
import { useParams } from 'react-router-dom'

import api from '../api'

function FormView(){
  
  const formQuery = useGetForms()
  const {id} = useParams()
  
  if (formQuery.isLoading) return <Loader />
  
  const form =  formQuery.data.find(form => form.id == id)
  
  return <Form formData={form} editable={false}/>
  
}

export default FormView;