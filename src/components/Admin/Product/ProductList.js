import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import * as ImIcons from 'react-icons/im';

const ProductList = () => {
  const [product,setProduct] = useState([])

  const [center, setCenter] = useState(true)
  const [front, setFront] = useState(false)
  const [back, setBack] = useState(false)

  const [show, setShow] = useState(false)
  const [zoom, setZoom] = useState('')

  const previous = (i) => {
    if(center){ setCenter(false); setFront(false); setBack(true) }
    if(front){ setCenter(true); setFront(false); setBack(false) }
    if(back){ setCenter(false); setFront(true); setBack(false) }
  };
  
  const next = (i) => {
    if(center){ setCenter(false); setFront(true); setBack(false) }
    if(front){ setCenter(false); setFront(false); setBack(true) }
    if(back){ setCenter(true); setFront(false); setBack(false) }
  };

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
  
  // Delete Data
  const remove = async (id) => {
    let result = await fetch(`https://new.iice.foundation/deleteProduct/${id}`,{
      method:'delete'
    })
    result = await result.json()
    if(result){
      getProduct()
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
      
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '7' }}>
        { show && <>
        <h3 className='right pointer' onClick={()=>setShow(false)}><b>&#9447;</b></h3>
        <img src={`https://new.iice.foundation/photos/${zoom}`} className='rounded zoom shadow' alt='no img' /> </> }
      </div>
      
      <div className='row justify-content-evenly mt-2'>
        {
          product.length>0?
          product.map((i,index)=>(
            
            <div className='col-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 border rounded m-4 shadow' key={index}>

              { center && <>
                <img src={`https://new.iice.foundation/photos/${i.cphoto}`} className='col-10 border rounded mt-5' height="250" alt='no img' onClick={ ()=>{setZoom(i.cphoto); setShow(true)} }/>
                <h5 className='right pointer' onClick={ ()=>{setZoom(i.cphoto); setShow(true)} }><ImIcons.ImZoomIn /></h5>
                {/* <button className='btn btn-primary' onClick={ ()=>{previous(console.log(i.bphoto))} }>Previous</button> &nbsp; &nbsp; &nbsp;  */}
                {/* <button className='btn btn-primary' onClick={ ()=>{next(console.log(i.fphoto))} }> &nbsp; Next &nbsp; </button> */}
              </> }

              { front && <>
                <img src={`https://new.iice.foundation/photos/${i.fphoto}`} className='col-10 border rounded mt-5' height="250" alt='no img' onClick={ ()=>{setZoom(i.fphoto); setShow(true)} } />
                <h5 className='right' onClick={ ()=>{setZoom(i.fphoto); setShow(true)} }><ImIcons.ImZoomIn /></h5>
                {/* <button className='btn btn-primary' onClick={ ()=>{previous(console.log(i.cphoto))} }>Previous</button> &nbsp; &nbsp; &nbsp;  */}
                {/* <button className='btn btn-primary' onClick={ ()=>{next(console.log(i.bphoto))} }> &nbsp; Next &nbsp; </button> */}
              </> }

              { back && <>
                <img src={`https://new.iice.foundation/photos/${i.bphoto}`} className='col-10 border rounded mt-5' height="250" alt='no img' onClick={ ()=>{setZoom(i.bphoto); setShow(true)} } />
                <h5 className='right' onClick={ ()=>{setZoom(i.bphoto); setShow(true)} }><ImIcons.ImZoomIn /></h5>
                {/* <button className='btn btn-primary' onClick={ ()=>{previous(console.log(i.fphoto))} }>Previous</button> &nbsp; &nbsp; &nbsp;  */}
                {/* <button className='btn btn-primary' onClick={ ()=>{next(console.log(i.cphoto))} }> &nbsp; Next &nbsp; </button> */}
              </> }

              <div className='mb-5'>
                <h3 className='text-primary'>{i.title}</h3>
                <h3><span className='text-danger'>{(Math.round(i.offer/i.price*100))-100}%</span><span>₹{i.offer}</span></h3>
                <h6>M.R.P. - <del>₹{i.price}</del></h6>
                <h6>Wholesale - ₹{i.wholesale}</h6>

                <h5 className='text-primary'><u>Description</u></h5>
                <h6>{i.description}</h6>

                <div className='mt-3'>
                  <NavLink to={'/updateProduct/'+i._id}><button className='btn btn-info shadow'> &nbsp; &nbsp; Edit &nbsp; &nbsp; </button></NavLink> &nbsp; &nbsp; &nbsp;  
                  <button className='btn btn-danger shadow' onClick={()=>{remove(i._id)}}>Remove</button>
                </div>
              </div>

            </div>
          )) :
          <h4 className='text-danger mt-4'>No Data Found</h4>
        }
      </div>

      {
        product.length>0 ? !show ?
            <>
              <div className='previous'>
                <button className='btn btn-primary pt-5 pb-5 shadow' onClick={previous}><h2>{'<'}</h2></button>
              </div>
              <div className='next'>
                <button className='btn btn-primary pt-5 pb-5 shadow' onClick={next}><h2>{'>'}</h2></button>
              </div>
            </>:
          null : null
      }

    </div>
  )
}

export default ProductList