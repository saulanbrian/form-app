import { useGetForms, useCreateForm } from '../queries/forms'

import QuestionnairePreview from '../component/questionnaire-preview'

import Loader from '../component/loader.jsx'

import api from '../api'

import './forms.css'

function UserForms () {
  
  const formQuery = useGetForms()
  const newFormMutation = useCreateForm()

  
  function addForm(e){
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
      {newFormMutation.isPending? 'pending': 'create form'}
    </button>
    </form>
  </div>
}

export default UserForms

