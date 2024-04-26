import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import ProtectedRoute from './utils/protected-route'

import Root from './root'
import Home from './pages/home'
import SignIn,{SignInAction} from './pages/signin'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Root />,
    children:[
      {
        path:'home',
        element:<ProtectedRoute><Home /></ProtectedRoute>
      }
      ]
  },
  {
    path:'auth/sign-in',
    element:<SignIn />,
    action:SignInAction
  }
  ])
  
function App(){
  return <RouterProvider router={router} />
}

export default App;