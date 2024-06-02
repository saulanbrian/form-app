import { useLocation,useNavigate } from 'react-router-dom'

export default function Success (){
  
  const location = useLocation()
  const navigate = useNavigate()
  
  const { message,redirect,redirectMessage } = location.state
  
  const style = {
    minHeight:'80vh',
  }
  
  function handleRedirect(){
    navigate(redirect)
  }
  
  return <div className='container col-lg-5 col-md-8 col-10 mt-1 p-2 d-flex justify-content-center align-items-center flex-column lead' style={style}>
    <h1>{message}</h1>
    <button className='btn btn-outline-dark mt-2 '
            onClick={handleRedirect}>{redirectMessage}</button>
  </div>
}