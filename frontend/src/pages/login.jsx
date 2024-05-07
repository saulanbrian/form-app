import { Form,useActionData,Navigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/usercontext'
import { jwtDecode } from 'jwt-decode'


function Login(){
  
  const {login,isAuthenticated,user,setUser} = useAuth()
  
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
      const decoded = jwtDecode(access)
      setUser({
        username:decoded.username,
        id:decoded.user_id
      })
    }
    
  }
  
  return <form onSubmit={authenticate}>
  <input name='username' />
  <input type='password' name='password' />
  <button type='submit'>login</button>
  </form>
}

export default Login;

