import React, { useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [disabled,setDisabled] = useState(false)

  const [title,setTitle] = useState('')
  const [photo,setPhoto] = useState('')
  const [price,setPrice] = useState('')
  const [offer,setOffer] = useState('')

  useEffect(()=>{
    getProduct()
    // eslint-disable-next-line 
  },[])

  // Pre-Filled Data
  const getProduct = async () => {
    let result = await fetch(`https://new.iice.foundation/updateProduct/${params.id}`)
    result = await result.json()
    setTitle(result.title)
    setPrice(result.price)
    setOffer(result.offer)
  }
  
  
  // Update Data
  const submit = async (e) => {
    try{
      if(title && price && offer){
        setDisabled(true)
        
        if(photo){
          let url = `https://new.iice.foundation/updatePhoto/${params.id}`
          
          const formData = new FormData()
          formData.append('title',title)
          formData.append('photo',photo,photo.title)
          formData.append('price',price)
          formData.append('offer',offer)
          let result = await axios.put(url,formData)

          if(result.data.message){
            alert(result.data.message)
            navigate('/productList')
          }
          else{
            setDisabled(false)
            alert("Error")
          }
        }
        else{
          setDisabled(false)
          let result = await fetch(`https://new.iice.foundation/updateProduct/${params.id}`,{
            method:'put',
            body:JSON.stringify({ title, price, offer }),
            headers:{'Content-Type':'application/json'}
          })
          result = await result.json()
          console.log(result)
        
          if(result.message){
            alert(result.message)
            navigate('/productList')
          }
          else{
            setDisabled(false)
            alert("Error")
          }
        }
      }
      else{
        alert("Please All Fields")
      }
    }
    catch{
      alert("Error")
      setDisabled(false)
    }
  }

  return (
    <div className='container mb-5 body'>
      <h2 className='text-primary mt-4'>Update Product</h2>

      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <input type="text" className="form-control" autoComplete='off' placeholder="Enter Product Title" name="title"  
          value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
      </div>
      
      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <input type="file" className="form-control" accept='image/*' name="photo" 
          onChange={(e)=>setPhoto(e.target.files[0])} />
        </div>
      </div>

      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <input type="text" className="form-control" autoComplete='off' placeholder="Enter Product Price" name="price"  
          value={price} onChange={(e)=>setPrice(e.target.value)} />
        </div>
      </div>
      
      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <input type="text" className="form-control" autoComplete='off' placeholder="Enter Offer Price" name="offer"  
          value={offer} onChange={(e)=>setOffer(e.target.value)} />
        </div>
      </div>
      
      <button type="submit" className={`btn btn-primary col-4 col-md-2 mt-4 p-2 ${disabled ? 'disabled' : null}`} onClick={submit}>Submit</button>
    </div>
  )
}

export default UpdateProduct