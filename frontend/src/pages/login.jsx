import { Form,useActionData,Navigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/usercontext'

function Login(){
  
  const {login,isAuthenticated} = useAuth()
  
  if(isAuthenticated){
    return <Navigate to='../' />
  }
  
  const authenticate = async(e) =>{
    e.preventDefault();
    const {username,password} = e.target
    
    const res = await api.post('auth/token/',{
      username:username.value,
      password:password.value,
    })
    
    if(res.status === 200){
      const {access,refresh} = res.data
      login({access,refresh})
      console.log('logged in ')
    }
    
  }
  
  return <form onSubmit={authenticate}>
  <input name='username' />
  <input type='password' name='password' />
  <button type='submit'>login</button>
  </form>
}

export default Login;

