import { Form,Link } from 'react-router-dom'

function AuthForm ({userAction}) {
  
  return <Form className='form-group container border p-2 m-1 d-grid gap-2' action='' method='post' >
  { userAction === 'login'? 
    <h1 className='form-label'>Welcome Back!</h1>:
    <h1 className='form-label'>Create Account</h1> }
  <input name='username' 
        className='form-control' 
        placeholder='username'/>
  <input name='password' 
         className='form-control'
         placeholder='password'/>
  { userAction === 'register' && <input name='confirmation' 
  placeholder='confirm password' className='form-control'/>}
  <button type='submit' className='btn btn-primary' >submit</button>
  { userAction === 'register'
    ?<p>already have an account? click <Link to='../login'>here</Link> to login</p>
    :<p>don't have an account? click <Link to='../signup'>here</Link> to sign up</p>
  }
  </Form>
  
}

export default AuthForm;