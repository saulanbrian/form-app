import BackHeader from '../component/backheader.jsx'
import Form from '../component/form'

import { useCreateForm } from '../queries/forms.jsx'

import { Navigate } from 'react-router-dom'

function FormCreation(){
  
  const form = {
    title:'',
    questions:[{
      question_text:'',
      choices:[
        {choice_text:'',is_correct:true},
        {choice_text:'',is_correct:false},
        ]
    }]
  }

  const newFormMutation = useCreateForm()
  
  return <> 
    <BackHeader />
    <Form actionFunction={newFormMutation.mutate} 
          formData={form}/>
    { newFormMutation.isSuccess && <Navigate to='../my-forms' />}
    { newFormMutation.isError && 
      <p className='text-danger'>{newFormMutation.error.message}</p> }
  </>
  
}

export default FormCreation;