import { useAuth } from '../context/usercontext'
import { Outlet,NavLink, useLocation} from 'react-router-dom'



function Home(){
  
  const loc = useLocation().pathname
  
  const {user, isAuthenticated} = useAuth()
  
  const homeContent = <><h1>you are at home</h1></>
  
  const style = {
    minWidth:'100vw'
  }
  
  return <>
  <header className='container m-0  p-0  '>
    <nav className='container  d-flex border m-0 pt-1 pb-1 gap-1 ' style={style}>
      <NavLink to='' className='btn btn-outline-primary col-md-2 col-lg-1 text-nowrap col-3 '>
        home
      </NavLink>
      <NavLink to='my-forms' className='btn btn-outline-primary col-md-2 col-lg-1 col-3 text-nowrap' >
        my forms
      </NavLink>
      { isAuthenticated ? 
      <NavLink to='logout' className='btn btn-outline-danger col-md-2 col-lg-1 col-3 ms-auto' >
        logout
      </NavLink> :
      <NavLink className='btn btn-outline-primary col-md-2 col-lg-1 col-3 ms-auto' to='login' >
        login
      </NavLink>}
    </nav>
  </header>
  
  { loc === '/' ? homeContent: <Outlet/> }
  </>
  
}

export default Home;