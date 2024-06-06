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
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
    </svg>
    <h1 className='lead' style={{fontSize:'3rem'}}>SUCCESS!</h1>
    <p>{message}</p>
    <button className='btn btn-outline-dark mt-2 '
            onClick={handleRedirect}>{redirectMessage}</button>
  </div>
}