import { Form } from 'react-router-dom'


function AuthForm ({method,action}) {
  
  return <Form action={action} method='post' >
  <input name='username' placeholder='username'/>
  <input name='password' placeholder='password'/>
  { method === 'register' && <input name='confirmation' 
  placeholder='confirm password'/> }
  <button type='submit'>submit</button>
  </Form>
  
}

export default AuthForm;