import './questionnaire-preview.css'

function QuestionnairePreview(props){
  
  function handleClick(){
    console.log('got clicked')
  }
  
  return <div className='d-flex container border bg-light justify-content-start mb-2 ps-3 rounded align-items-center' onClick={handleClick} >
    <p className='lead row'>{props.title}</p>
  </div>
}

export default QuestionnairePreview;