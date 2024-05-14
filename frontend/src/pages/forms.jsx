import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query'

import { useAuth } from '../context/usercontext'

import QuestionnairePreview from '../component/questionnaire-preview'

import Loader from '../component/loader.jsx'

import api from '../api'

import './forms.css'

function UserForms () {
  
  const { user } = useAuth();
  const queryClient = useQueryClient()
  
  const formQuery = useQuery({
    queryKey:['forms'],
    queryFn: async() => {
      const res = await api.get('api/question/question-set/')
      const forms = await res.data
      return [...forms]
    }
  })
  
  const newFormMutation = useMutation({
    mutationFn:async(title) => {
      const author = user.id
      const res = await api.post('api/question/question-set/create/',
      {title:title})
      return res.data
    },
    onSuccess:() => {
      queryClient.invalidateQueries(['forms'])
    }
  })

  function addForm(e){
    e.preventDefault();
    const title = e.target.title.value
    newFormMutation.mutate(title)
  }
  
  if (formQuery.isLoading) return <Loader />
  
  
  return <div className='container-fluid'>
    { formQuery.data.map(
      (questionnaire) => {
      return <QuestionnairePreview 
        key={questionnaire.id}
        title={questionnaire.title}
        />
      })
    }
    
    <form className='form-group d-flex justify-content-center gap-1' onSubmit={addForm}>
    <input name='title' className='form-control' />
    <button className='btn btn-primary' type='submit'>
      create questionnaire
    </button>
    </form>
  </div>
}

export default UserForms

