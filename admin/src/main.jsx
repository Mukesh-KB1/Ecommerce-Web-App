import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Add , List , Order} from '../src/pages/index.js'
import {RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App/>} >
      <Route path='add' element={ <Add/> } />
      <Route path='list' element={ <List/> } />
      <Route path='orders' element={ <Order/> } />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
