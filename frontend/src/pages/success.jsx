import { useLocation,useNavigate } from 'react-router-dom'

export default function Success (){
  
  const location = useLocation()
  const navigate = useNavigate()
  
  const { message,redirect,redirectMessage } = location.state
  
  const style = {
    minHeight:'80vh !important',
  }
  
  function handleRedirect(){
    navigate(redirect)
  }
  
  return <div className='container-fluid bg-light p-3'>
  <div className='container border border-success bg-success-subtle mt-1 p-2' style={{style}}>
    <h1>{message}</h1>
    <button className='btn btn-outline-dark'
            onClick={handleRedirect}>{redirectMessage}</button>
  </div>
  </div>
  
}