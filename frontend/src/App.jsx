import { createBrowserRouter,RouterProvider } from 'react-router-dom'


import ProtectedRoute from './utils/protectedroute'

import Root from './root'
import Home from './pages/home'
import SignIn,{SignInAction} from './pages/signin'
import LogOut from './pages/logout'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Root />,
    children:[
      {
        path:'home',
        element:<Home />
      },
      {
        path:'forms',
        element:<ProtectedRoute><h1>this is where your forms are </h1></ProtectedRoute>
      }
      ]
  },
  {
    path:'auth/sign-in',
    element:<SignIn />,
    action:SignInAction
  },
  {
    path:'auth/logout',
    element:<LogOut />
  }
  ])
  
function App(){
  return <RouterProvider router={router} />
}

export default App;