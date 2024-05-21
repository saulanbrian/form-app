import BackHeader from '../component/backheader.jsx'
import Form from '../component/form'

import { useCreateForm } from '../queries/forms.jsx'

function FormCreation(){
  
  const newFormMutation = useCreateForm()
  
  return <> 
    <BackHeader />
    <Form actionFunction={newFormMutation.mutate} />
  </>
  
}

export default FormCreation;