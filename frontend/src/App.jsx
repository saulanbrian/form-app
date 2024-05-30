import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import UserContextProvider from './context/usercontext'
import FormContextProvider from './context/formcontext'

import Home from './pages/home'
import UserForms from './pages/forms'
import FormCreation from './pages/form-creation'
import Login, { LoginAction } from './pages/login'
import Logout from './pages/logout'
import SignUp,{ SignUpAction } from './pages/signup.jsx'
import EditForm from './pages/edit'
import FormView from './pages/form-view.jsx'
import RespondentView from './pages/respondent-view.jsx'
import Result from './pages/result.jsx'
import Success from './pages/success.jsx'

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
      },
    ]
  },
  {
    path:'success/',
    element:<Success />
  },
  {
    path:'my-forms/create',
    element:<Private><FormCreation /></Private>
  },
  {
    path:'my-forms/:id',
    element:<Private><FormView /></Private>
  },
  {
    path:'form/:id',
    element:<Private><RespondentView /></Private>
  },
  {
    path:'form/:formId/:responseId',
    element:<Private><Result /></Private>
  },
  {
    path:'login',
    element:<Login />,
    action:LoginAction
  },{
    path:'signup',
    element:<SignUp />,
    action:SignUpAction
  },
  {
    path:'logout',
    element:<Logout />
  }
  ])
  
function App(){
  return (
    <UserContextProvider>
      
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>

    </UserContextProvider>
  )
}
  
export default App;