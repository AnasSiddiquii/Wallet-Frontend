import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const navigate = useNavigate()
  const [disabled,setDisabled] = useState(false)

  const [title,setTitle] = useState('')
  const [photo,setPhoto] = useState('')
  const [price,setPrice] = useState('')
  const [offer,setOffer] = useState('')
  
  const submit = async (e) => {
    
    try{
      setDisabled(true)
      
      let result = await fetch('https://new.iice.foundation/checkProduct',{
        method:'post',
        body:JSON.stringify({ title, price, offer }),
        headers:{'Content-Type':'application/json'}
      })
      result = await result.json()
      
      if(result.error){
        setDisabled(false)
        alert(result.error)
      }
      else{
        if(!photo){
          setDisabled(false)
          alert('Please Add Photo')
        }
        else{
          let url = 'https://new.iice.foundation/addProduct'
          
          const formData = new FormData()
          formData.append('title',title)
          formData.append('photo',photo,photo.title)
          formData.append('price',price)
          formData.append('offer',offer)
          let result = await axios.post(url,formData)

          if(result.data.message){
            alert(result.data.message)
            navigate('/productList')
          }
          else{
            setDisabled(false)
            alert(result.data.error)
          }
        }
      }
    }
    catch{
      alert("Error")
      setDisabled(false)
    }
  }
    
    return (
      <div className='container mb-5 body'>
      <h2 className='text-primary mt-4'>Add Product</h2>
      
      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <input type="text" className="form-control" autoComplete='off' placeholder="Enter Product Title" name="title"  
          onChange={(e)=>setTitle(e.target.value)} />
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
          onChange={(e)=>setPrice(e.target.value)} />
        </div>
      </div>
      
      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <input type="text" className="form-control" autoComplete='off' placeholder="Enter Offer Price" name="offer"  
          onChange={(e)=>setOffer(e.target.value)} />
        </div>
      </div>
      
      <button type="submit" className={`btn btn-primary col-4 col-md-2 mt-4 p-2 ${disabled ? 'disabled' : null}`} onClick={submit}>Submit</button>
    </div>
  )
}

export default AddProduct