import { NavLink, Outlet,Navigate } from 'react-router-dom'

function Root(){
  
  const navStyle = {
    display:'flex',
    gap:'10px',
  }
  
  
  
  return (
  <>
    <header>
      <nav style={navStyle}>
        <NavLink to='home/'>home</NavLink>
        <NavLink to='forms/'>my forms</NavLink>
        <NavLink to='auth/logout/'>logout</NavLink>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </>
  )
}

export default Root;