import { NavLink,Outlet } from 'react-router-dom'
import './root.css'

function Root(){
  return <>
    <nav>
    <NavLink to='home'>Home</NavLink>
    <NavLink to='my-forms'>My Forms</NavLink>
    <NavLink to='about'>About</NavLink>
    </nav>
    
    <Outlet />
  </>
}

export default Root;