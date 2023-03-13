import './App.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'

import Protected from './components/Private/Protected'
import Protectedusr from './components/Private/Protectedusr'

import Home from './components/Main/Home'
import Product from './components/Main/Products'
import AdminLogin from './components/Main/AdminLogin'
import Login from './components/Main/Login'

import Products from './components/User/Products'

import ProductList from './components/Admin/Product/ProductList'
import AddProduct from './components/Admin/Product/AddProduct'
import UpdateProduct from './components/Admin/Product/UpdateProduct'
import Signup from './components/Admin/Signup'
import AdminSignup from './components/Admin/AdminSignup'



const App = () => {

  return (
    <HashRouter>
      <Navbar />
      <div className="center">
        <Routes>
        
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/login' element={<Login />} />
          <Route path="/*" element={<Navigate to='/' />} />

          <Route element={<Protectedusr />}>
            <Route path='/products' element={<Products />} />
          </Route>

          <Route element={<Protected />}>
            <Route path='/productList' element={<ProductList />} />
            <Route path='/addProduct' element={<AddProduct />} />
            <Route path='/updateProduct/:id' element={<UpdateProduct />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/adminSignup' element={<AdminSignup />} />
          </Route>

        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
