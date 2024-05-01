import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home'
import Private from './pages/private'
import Login from './pages/login'

import { UserContextProvider } from './context/usercontext'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'private',
    element:<Private><h1>this is private nigga</h1></Private>
  },
  {
  path:'login',
  element:<Login />,
  }
  ])

function App(){
  return (
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
  );
}

export default App;
