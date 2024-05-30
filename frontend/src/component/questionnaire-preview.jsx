// import './questionnaire-preview.css'
import { useNavigate, useLocation} from 'react-router-dom'
import { useState } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'

function QuestionnairePreview(props){
  
  const [isCopied,setIsCopied] = useState(false)
  
  function handleCopy(){
    setIsCopied(true)
    setTimeout(() => setIsCopied(false),3000)
  }
  
  const navigate = useNavigate()
  
  function handleClick(){
    navigate(`${props.id}`)
  }
  
  const formPath = `http://localhost:5173/form/${props.id}`
  
  return <div className='container border border-dark bg-light mb-2 p-3 ps-4 col-mb-9 col-sm-12'  >
    <h1 className='lead col-12 '>{props.title}</h1>
    <p className='row col-12'>{ props.description }</p>
    <CopyToClipboard text={formPath}>
      <button onClick={handleCopy} className='btn btn-outline-secondary me-1'>
        { isCopied? '✓copied': 'copy link' }
      </button>
    </CopyToClipboard>
    <button onClick={handleClick} className='btn btn-outline-primary '>view</button>
  </div>
}

export default QuestionnairePreview;