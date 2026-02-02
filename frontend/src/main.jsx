import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider} from 'react-router';
import {Home,About,Cart,Collection,Contact,Login,Orders,Product,PlaceOrder,Verify} from "./pages/index.js"
import ShopContextProvider from './context/ShopContext.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="cart" element={<Cart />} />
      <Route path="collection" element={<Collection />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="orders" element={<Orders />} />
      <Route path="product/:productId" element={<Product />} />
      <Route path="place-orders" element={<PlaceOrder />} />
      <Route path="verify" element={<Verify />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <ShopContextProvider>
    <RouterProvider router={router} />
  </ShopContextProvider>
)


