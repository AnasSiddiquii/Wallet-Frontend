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
      <div className='table-responsive'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className='col-1'>S&nbsp;no.</th>
              <th className='col-2'>Photo</th>
              <th className='col-3'>Title</th>
              <th className='col-3'>Price</th>
              <th className='col-3'>Offer</th>
            </tr>
          </thead>
          <tbody>
            {
              product.length>0?
              product.map((i,index)=>(
                <tr key={i._id}>
                  <td className='p-4'>{index+1}</td>
                  <td>
                    <img src={`https://new.iice.foundation/photos/${i.photo}`} className='border rounded' height='70' width='70' alt='no img' />
                  </td>
                  <td className='p-4'>{i.title}</td>
                  <td className='p-4'><del>{i.price}</del></td>
                  <td className='p-4'>{i.offer}</td>
                </tr>
              )):
              (
                <tr>
                  <td colSpan={5}><h4 className='text-danger'>No Data Found</h4></td>
                </tr>
              )
            }
          
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList