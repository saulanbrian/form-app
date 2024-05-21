import { useFormContext } from '../context/formcontext.jsx'

import { useGetForms,useUpdateForm } from '../queries/forms.jsx'

import { useParams } from 'react-router-dom'

import Loader from '../component/loader.jsx'
import BackHeader from '../component/backheader.jsx'

import Form from '../component/form.jsx'

import api from '../api.jsx'

export default function EditForm(){
  
  const {id} = useParams()
  const formQuery = useGetForms()
  const updateFormMutation = useUpdateForm()
  
  if (formQuery.isLoading) return <Loader />
  
  const actionFunction = updateFormMutation.mutate
  
  const form = formQuery.data.find(form => form.id == id )
  if (!form) return <p>form not found</p>
  
  return<>
    <BackHeader />
    <Form formData={form} 
          actionFunction={actionFunction}/>
  </>
}