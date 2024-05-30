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
  
  return <div className='container-fluid bg-primary-subtle' id='forms-main' >
  { formQuery.data && formQuery.data.length > 0
  ?<div className='container p-2'>{formQuery.data.map((form) => {
    return <QuestionnairePreview 
            key={form.id} 
            title={form.title}
            id={form.id}
            description={form.description}/>
  })}</div>:'you hav no forms yet'
  }
  <div className='container d-flex justify-content-center'>
  <h1 className='btn btn-primary' onClick={() => {navigate('create')}}>
  create
  </h1>
  </div>
  </div>
  
}

export default UserForms

