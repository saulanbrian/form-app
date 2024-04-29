import { createBrowserRouter,RouterProvider } from 'react-router-dom'


import ProtectedRoute from './utils/protectedroute'

import Root from './root'
import Home from './pages/home'
import SignIn,{SignInAction} from './pages/signin'
import LogOut from './pages/logout'
import UserQuestionnaires,{userQuestionnaireLoader} from './pages/userquestionnaires'
import ErrorPage from './pages/error'
 

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
        element:<ProtectedRoute><UserQuestionnaires/></ProtectedRoute>,
        loader:userQuestionnaireLoader,
        errorElement:<ErrorPage />,
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