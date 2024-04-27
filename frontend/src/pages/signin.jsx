import AuthForm from '../components/auth-form'
import api from '../api'
import { redirect } from 'react-router-dom'

function SignIn(){
  
  return <AuthForm 
    method='sign-in'
    action='' 
    />
}

const SignInAction = async({request}) => {
  
  const data = await request.formData();
  const username = data.get('username')
  const password = data.get('password')
  
  try{
    const res = await api.post('auth/token/',{
      username:username,
      password:password
    })
    if (res.status === 200){
      localStorage.setItem('ACCESS_TOKEN',res.data.access)
      localStorage.setItem('REFRESH_TOKEN',res.data.refresh);
      return redirect('/home')
    }

  }catch(e){
    if (e.response && e.response.status === 401){
      return {message:'we couldnt find a user with the given credentials'}
    }else{
      return {message:e.message}
    }
  }
  

}

export default SignIn;
export {SignInAction};