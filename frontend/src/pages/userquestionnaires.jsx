import { useLoaderData,Outlet } from 'react-router-dom'
import api from '../api'

function UserQuestionnaires () {
  const questionnaires = useLoaderData()
  console.log(questionnaires)
  
  return <h1>your questionnaiers here</h1>
  
}

export const userQuestionnaireLoader = async() => {
  
  const res = await api.get('api/question')
  
  if (res.status === 200){
    return res.data
  }else{
    throw Error('couldnt fetch')
  }
  
}

export default UserQuestionnaires;