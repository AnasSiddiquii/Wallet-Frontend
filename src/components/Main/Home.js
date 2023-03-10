import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    const auth = localStorage.getItem('admin')
    if (auth)(
      navigate('/productList')
    )
    const authstd = localStorage.getItem('user')
    if (authstd)(
      navigate('/products')
    )
    // eslint-disable-next-line 
  },[])

  return (
    <div className='container-fluid bg-img'>
      <div className='row justify-content-evenly'>
          <h1 className='text-light mt-4'>Homepage</h1>
          <h4 className='text-light p-3 mb-4 foot'>Copyright ® 2023 All Right Reserved | Privacy Policy</h4>
      </div>
    </div>
  )
}

export default Home
