import AuthForm from '../components/auth-form'
import api from '../api'

function SignIn(){
  
  return <AuthForm 
    method='sign-in'
    action='' 
    />
}

const SignInAction = async({request}) => {
  
  const data = await request.formData();
  
  try{
    const res = await api.post('api/auth/token/') 
    console.log(res)
    if (!res.ok){
      return {message:'we couldnt find a user with the given credentials'}
    }else{
      return {message:'logged in successfuly'}
    }
  }catch(e){
    return {message:'there was an internal error'}
  }
  

}

export default SignIn;
export {SignInAction};