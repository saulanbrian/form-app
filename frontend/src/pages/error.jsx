import { useRouteError,Link } from 'react-router-dom'

function ErrorPage () {
  
  const error = {status:401}
  
  if (error.status === 401){
    return <> 
    <h1>401 | authorization error. are you sure you are logged in?</h1>
  <Link to='../auth/sign-in/' >
  login here
  </Link>
  </>
  }
  return <>
  <h1>an error has occured</h1>
  <p>status: {error.status}</p>
  </>
  
}

export default ErrorPage;