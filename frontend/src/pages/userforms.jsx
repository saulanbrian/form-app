import { useLoaderData, Form, useActionData} from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/usercontext'

function UserForms(){
  
  const data = useLoaderData()
  const actionData = useActionData();
  
  if(data){
    console.log(data)
  }
  
  return <>
  <Form action='../my-forms' method='POST'>
  <input name='username' />
  <button type='submit' >submit</button>
  </Form>
  </>
  
}

export const userFormLoader = () =>{
  
  const getForms = async() =>{
    try{
      
      const res = await api.get('api/question/question-set/')
      
      if (res.status === 200){
        return res.data
      }
      
    }catch(e){
      throw Error('an error has occured. are you sure you are logged in?')
    }
  }
  const data = getForms();
  return data
}

export default UserForms;

export function userFormAction({request}){
  const {data} = request.formData();
  return data
  
}