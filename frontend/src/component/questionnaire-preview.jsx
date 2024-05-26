import './questionnaire-preview.css'
import { useNavigate } from 'react-router-dom'

function QuestionnairePreview(props){
  
  const navigate = useNavigate()
  
  function handleClick(){
    navigate(`${props.id}`)
  }
  
  return <div className='d-flex container border bg-light justify-content-start mb-2 ps-3 rounded align-items-center' onClick={handleClick} >
    <p className='lead row'>{props.title}</p>
  </div>
}

export default QuestionnairePreview;