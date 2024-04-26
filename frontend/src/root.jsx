import { NavLink, Outlet } from 'react-router-dom'

function Root(){
  
  return (
  <>
    <header>
    <h1>you are in the root</h1>
      <nav>
        <NavLink to='home/'>home</NavLink>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </>
  )
}

export default Root;