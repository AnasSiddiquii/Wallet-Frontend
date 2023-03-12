import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'

import Protected from './components/Private/Protected'
import Protectedusr from './components/Private/Protectedusr'

import ProductList from './components/Admin/Product/ProductList'
import AddProduct from './components/Admin/Product/AddProduct'
import UpdateProduct from './components/Admin/Product/UpdateProduct'

import OrderList from './components/Admin/OrderList'
import AdminSignup from './components/Admin/AdminSignup'

import Home from './components/Main/Home'
import AdminLogin from './components/Main/AdminLogin'
import Login from './components/Main/Login'
import Signup from './components/Main/Signup'

import Products from './components/User/Products'
import Orders from './components/User/Orders'
import Cart from './components/User/Cart'

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <div className="center">
        <Routes>
        
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/*" element={<Navigate to='/' />} />

          <Route element={<Protected />}>
            <Route path='/productList' element={<ProductList />} />
            <Route path='/addProduct' element={<AddProduct />} />
            <Route path='/updateProduct/:id' element={<UpdateProduct />} />
            <Route path='/OrderList' element={<OrderList />} />
            <Route path='/adminSignup' element={<AdminSignup />} />
          </Route>

          <Route element={<Protectedusr />}>
            <Route path='/products' element={<Products />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/cart' element={<Cart />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
