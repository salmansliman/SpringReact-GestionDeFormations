import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Formation from './Components/AddFormation/formation'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
  path: '/login',
  element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
  path: '/',
  element: <div><Dashboard/></div>
  },
  {
  path:'/formation',
  element:<div><Formation></Formation></div>
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
