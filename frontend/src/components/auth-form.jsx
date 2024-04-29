import { Form,useActionData,Navigate,redirect } from 'react-router-dom'
import { useEffect } from 'react'

function AuthForm({action,method}){
  
  const data = useActionData()
  
  useEffect(()=>{},[])
  return <Form method='post' action={action}>
  <input name='username' />
  <input name='password' type='password' />
  { method == 'signup' &&
  <input name='password-confirmation' type='password' />
  }
  <button>{method}</button>
  <h1>{ data && data.message && data.message }</h1>
  </Form>
  
}

export default AuthForm;