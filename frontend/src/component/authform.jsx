import { Form,Link } from 'react-router-dom'

import './authform.css'

function AuthForm ({userAction}) {

  const style = {
    minHeight:'60vh'
  }
  
  return <Form id='auth-form' className='form-group container col-lg-4 col-md-8 border p-3 rounded m-1 d-grid gap-2 bg-light' action='' method='post' style={style}>

  { userAction === 'login'? 
    <h1 className='form-label d-flex justify-content-center align-items-center'>Welcome Back!</h1>:
    <h1 className='form-label d-flex justify-content-center align-items-center'>Create Account</h1> }

  <input name='username' className='form-control' placeholder='username'/>
  <input name='password' type='password' className='form-control' placeholder='password'/>
  
  { userAction === 'register' && <input name='confirmation' placeholder='confirm password' type='password' className='form-control'/>}

  <button type='submit' className='btn btn-primary' >submit</button>

  { userAction === 'register'
    ?<p>already have an account? click <Link to='../login'>here</Link> to login</p>
    :<p>don't have an account? click <Link to='../signup'>here</Link> to sign up</p>
  }
  </Form>
  
}

export default AuthForm;