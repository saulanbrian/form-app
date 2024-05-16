import { useGetForms, useCreateForm } from '../queries/forms'

import { Navigate } from 'react-router-dom'
import { useState } from 'react'

import QuestionnairePreview from '../component/questionnaire-preview'

import Loader from '../component/loader.jsx'

import api from '../api'

import './forms.css'

function UserForms () {
  
  const [creating, setCreating] = useState(false)
  
  const formQuery = useGetForms()
  const newFormMutation = useCreateForm()

  
  if(creating) return <Navigate to='create' />
  
  if (formQuery.isLoading) return <Loader />
  
  console.log(formQuery.data)
  
  return <>
  { formQuery.data && formQuery.data.length > 0
  ?formQuery.data.map((form) => {
    return <QuestionnairePreview key={form.id} title={form.title} />
  }):'you hav no forms yet'
  }
  <div className='container d-flex justify-content-center'>
  <button className='btn btn-primary' 
    onClick={() => { setCreating(true)}}>
  create
  </button>
  </div>
  </>
  
//   return <div className='container-fluid'>
//     { formQuery.data.map(
//       (questionnaire) => {
//       return <QuestionnairePreview 
//         key={questionnaire.id}
//         title={questionnaire.title}
//         />
//       })
//     }
//     
//     <form className='form-group d-flex justify-content-center gap-1' onSubmit={addForm}>
//     <input name='title' className='form-control' />
//     <button className='btn btn-primary' type='submit'>
//       {newFormMutation.isPending? 'pending': 'create form'}
//     </button>
//     </form>
//   </div>
}

export default UserForms

