import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home'
import Private from './pages/private'
import Login from './pages/login'
import Root from './pages/root'
import UserForms,{ userFormLoader, userFormAction} from './pages/userforms'
import Playground from './pages/playground'

import { UserContextProvider } from './context/usercontext'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    children:[
      {
        path:'home',
        element:<h1>home</h1>
      },
      {
        path:'my-forms',
        element:<Private><UserForms /></Private>,
        loader:userFormLoader,
        action:userFormAction
      },
      {
        path:'about',
        element:<h1>about</h1>
      },
      {
        path:'playground',
        element:<Playground />
      }
      ]
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
