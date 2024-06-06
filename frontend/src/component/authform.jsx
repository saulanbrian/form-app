import { Form,Link } from 'react-router-dom'

import './authform.css'

function AuthForm ({userAction,errors}) {

  
  
  return <Form id='auth-form' className='form-group container col-lg-4 col-md-8 border rounded m-1 bg-light' action='' method='post' >

  { userAction === 'login'? 
    <h1 className='form-label d-flex justify-content-center align-items-center'>Welcome Back!</h1>:
    <h1 className='form-label d-flex justify-content-center align-items-center'>Create Account</h1> }

  <input name='username' className='form-control' placeholder='username'/>
  {errors && errors.username && <span className='text-danger'>{errors.username}</span>}

  <input name='password' type='password' className='form-control' placeholder='password'/>
  
  { userAction === 'register' && <input name='confirmation' placeholder='confirm password' type='password' className='form-control'/>}

  {
    errors && errors.detail && <span className='text-danger m-0'>{errors.detail}</span>
  }

  <button type='submit' className='btn btn-primary' >submit</button>

  { userAction === 'register'
    ?<span className='m-0'>already have an account? click <Link to='../login'>here</Link> to login</span>
    :<span className='m-0'>don't have an account? click <Link to='../signup'>here</Link> to sign up</span>
  }


  </Form>
  
}

export default AuthForm;