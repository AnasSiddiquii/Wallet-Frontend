import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import * as FcIcons from 'react-icons/fc';
import { IconContext } from 'react-icons';
import {NavLink, useNavigate} from 'react-router-dom';

const Navbar = (props) => {

  const auth = localStorage.getItem('admin')
  const authusr = localStorage.getItem('user')
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/')
  }
 
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => { 
    setSidebar(!sidebar)
  }
  
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        
        <div className='darknav fixed'>
          <NavLink to='#' className='menu-bars'>
            <FaIcons.FaBars className='bars' onClick={showSidebar} />
          </NavLink>
          {
            auth||authusr ?
            <div className='button'>
            <button className='btn btn-primary m-3'>
              <NavLink className="nav-link active text-white" to="/" onClick={logout} >Logout</NavLink>
            </button>
            </div>:
            <div className='button'>
            <button className='btn btn-primary m-3'>
              <NavLink className="nav-link active text-white" to="/login">Login</NavLink>
            </button>
            </div>
          }
        </div>

        {/* blankspace for navbar position */}
        <h3 className='text-primary col-4 mt-4'>&nbsp;</h3> 
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <div className='nav-menu-items'>

            <li className='navbar-toggle' onClick={showSidebar}>
              <NavLink to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </NavLink>
            </li>

            {
              auth ?  
                <ul className="navbar-nav">
                  
                  {/* Admin Welcome */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link active text-white" to="/productList">
                      <h4><FcIcons.FcBusinessman /></h4>
                      <span>Welcome {JSON.parse(auth).name}</span>
                    </NavLink>
                  </li>

                  {/* Product List */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link active text-white" to="/productList">
                      <h4><FcIcons.FcGallery /></h4>
                      <span>Product List</span>
                    </NavLink>
                  </li>

                  {/* Add Product */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link active text-white" to="/addProduct">
                      <h4><FcIcons.FcPlus /></h4>
                      <span>Add Product</span>
                    </NavLink>
                  </li>

                  {/* Order List */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link active text-white" to="/orderList">
                      <h4><FcIcons.FcList /></h4>
                      <span>Order List</span>
                    </NavLink>
                  </li>
                  
                  {/* Admin Signup */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link active text-white" to="/adminsignup">
                      <h4><FcIcons.FcConferenceCall /></h4>
                      <span>Admin Signup</span>
                    </NavLink>
                  </li>
                  
                  {/* Logout */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link active text-white" to="/" onClick={logout} >
                      &nbsp;<FiIcons.FiLogOut />
                      <span>Logout</span>
                    </NavLink>
                  </li>

                </ul> : null
            }

            {
              !auth && !authusr ?
                <ul className="navbar-nav">
                  
                  {/* Admin */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link text-white" to="/admin">
                      <h4><FcIcons.FcBusinessman /></h4>
                      <span>Admin</span>
                    </NavLink>
                  </li>

                  {/* Homepage */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link text-white" to="/">
                      <h4><FcIcons.FcShop /></h4>
                      <span>Homepage</span>
                    </NavLink>
                  </li>

                  {/* Products */}
                  {/* <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link text-white" to="/product">
                      <h4><FcIcons.FcGallery /></h4>
                      <span>Products</span>
                    </NavLink>
                  </li> */}
                                    
                  {/* Login */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link text-white" to="/login">
                      <h4><FcIcons.FcManager /></h4>
                      <span>Login</span>
                    </NavLink>
                  </li>

                  {/* Signup */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link text-white" to="/signup">
                      <h4><FcIcons.FcPortraitMode /></h4>
                      <span>Signup</span>
                    </NavLink>
                  </li>

                </ul> : null
            }

            {
              authusr ?
                <ul className="navbar-nav">
                  
                  {/* Welcome */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link active text-white" to="/products">
                      <h4><FcIcons.FcBusinessman /></h4>
                      <span>Welcome {JSON.parse(authusr).name}</span>
                    </NavLink>
                  </li>

                  {/* Products */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link text-white" to="/products">
                      <h4><FcIcons.FcGallery /></h4>
                      <span>Products</span>
                    </NavLink>
                  </li>
                  
                  {/* Orders */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link text-white" to="/orders">
                      <h4><FcIcons.FcList /></h4>
                      <span>Orders</span>
                    </NavLink>
                  </li>
                  
                  {/* Cart */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link text-white" to="/cart">
                      <h4><AiIcons.AiOutlineShoppingCart /></h4>
                      <span>Cart</span>
                    </NavLink>
                  </li>

                  {/* Logout */}
                  <li className="nav-text" onClick={showSidebar}>
                    <NavLink className="nav-link active text-white" to="/" onClick={logout} >
                      &nbsp;<FiIcons.FiLogOut />
                      <span>Logout</span>
                    </NavLink>
                  </li>
                  
                </ul> : null
            }

          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;