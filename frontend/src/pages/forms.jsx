import { useGetForms, useCreateForm } from '../queries/forms'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import QuestionnairePreview from '../component/questionnaire-preview'

import Loader from '../component/loader.jsx'

import api from '../api'

import './forms.css'

function UserForms () {
  
  const navigate = useNavigate()
  const formQuery = useGetForms()
  const newFormMutation = useCreateForm()
  
  if (formQuery.isLoading) return <Loader />
  
  console.log(formQuery.data)
  
  return <>
  { formQuery.data && formQuery.data.length > 0
  ?formQuery.data.map((form) => {
    return <QuestionnairePreview 
            key={form.id} 
            title={form.title}
            id={form.id}/>
  }):'you hav no forms yet'
  }
  <div className='container d-flex justify-content-center'>
  <h1 className='btn btn-primary' onClick={() => {navigate('create')}}>
  create
  </h1>
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

