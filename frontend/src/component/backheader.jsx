import { useNavigate } from 'react-router-dom'

function BackHeader(){
  
  const navigate = useNavigate()
  
  return <header className='container bg-primary p-2 d-flex justify-content-start '>
  <a className='col-2 btn btn-danger' onClick={() => navigate(-1)
  }>
    back
  </a>
  </header>
  
}

export default BackHeader;