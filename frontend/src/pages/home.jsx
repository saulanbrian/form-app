import { useContext } from 'react'
import { UserContext } from '../context/usercontext'
import { NavLink } from 'react-router-dom'

function Home(){
  const { isAuthenticated } = useContext(UserContext)
  
  console.log('rendered')
  
  return <>
  <h1>home</h1>
  <p>is authenticated: {isAuthenticated? 'true':'false'}</p>
  <NavLink to='private'>private</NavLink>
  </>
}

export default Home;