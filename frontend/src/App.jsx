import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import UserContextProvider from './context/usercontext'

import Home from './pages/home'
import UserForms from './pages/forms'
import Login, { LoginAction } from './pages/login'
import Logout from './pages/logout'

import Private from '../utils/private'


const queryClient = new QueryClient()



const router = createBrowserRouter([
  {
    path:'',
    element:<Home />,
    children:[
      {
        path:'my-forms',
        element:<Private><UserForms /></Private>,
      }
    ]
  },
  {
    path:'login',
    element:<Login />,
    action:LoginAction
  },
  {
    path:'logout',
    element:<Logout />
  }
  ])
  
function App(){
  return <UserContextProvider>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  </UserContextProvider>
}
  
export default App;