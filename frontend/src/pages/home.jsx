import { useAuth } from '../context/usercontext'
import { Outlet,NavLink, useLocation} from 'react-router-dom'

import './home.css'

function Home(){
  
  const loc = useLocation().pathname
  
  const {user, isAuthenticated} = useAuth()
  
  const homeContent = <><h1>you are at home</h1></>
  
  return <>
  <header>
    <nav>
      <NavLink to='' >home</NavLink>
      <NavLink to='my-forms' >my forms</NavLink>
      { isAuthenticated ? <NavLink to='logout' >logout</NavLink> :<NavLink to='login' >login</NavLink>}
    </nav>
  </header>
  
  { loc === '/' ? homeContent: <Outlet/> }
  </>
  
}

export default Home;