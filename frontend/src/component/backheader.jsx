import { useNavigate } from 'react-router-dom'

function BackHeader(){
  
  const style = {
    maxWidth:'100vw ',
    minWidth:'100vw ',
  }
  
  const navigate = useNavigate()
  
  return <header className='container-fluid bg-primary p-0 pt-2 pb-2'>
  <div className='container  m-0' style={style}>
  <a className='col-lg-1 col-sm-2 btn btn-danger' onClick={() => navigate(-1)
  }>
    back
  </a>
  </div>
  </header>
  
}

export default BackHeader;