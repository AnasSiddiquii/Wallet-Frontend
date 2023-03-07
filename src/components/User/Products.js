import React, { useEffect, useState } from 'react'

const ProductList = () => {
  const [product,setProduct] = useState([])

  useEffect(()=>{
    getProduct()
    // eslint-disable-next-line 
  },[])

  // Get Data
  const getProduct = async () => {
    let result = await fetch('https://new.iice.foundation/Products')
    result = await result.json()
    if(result){
      setProduct(result)  
    }
  }
  
  // Search Data
  const search = async(e) => {
    const key = e.target.value
    if(key){
      let result = await fetch(`https://new.iice.foundation/searchProduct/${key}`)
      result = await result.json()
      if(result){
        setProduct(result)
      }
    }
    else{
      getProduct()
    }
  }

  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-sm-4'></div>
        <h2 className='text-primary col-sm-4 mt-4'>Products</h2>
        <div className='col-sm-4'>
        <input type="text" className="form-control mt-4" placeholder="Search....." onChange={search} />
        </div>
      </div>
      
      <div className='row justify-content-evenly'>
        {
          product.length>0?
          product.map((i,index)=>(
            
            <div className='col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 border rounded m-5' key={index}>
              <div className='p-3 mt-4'><h2>{i.title}</h2></div>
              <div><img src={`https://new.iice.foundation/photos/${i.photo}`} className='border rounded' height='250' width='250' alt='no img' /></div>
              <div className='p-2 mt-3 mb-4'>
                <h2>₹ {i.offer}</h2>
                <h6>M.R.P. - <del>₹ {i.price}</del></h6>
              </div>
            </div>

          )) :
          <h4 className='text-danger mt-4'>No Data Found</h4>
        }
      </div>
    </div>
  )
}

export default ProductList