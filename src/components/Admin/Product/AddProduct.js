import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const navigate = useNavigate()
  const [disabled,setDisabled] = useState(false)

  const [cphoto,setCPhoto] = useState('')
  const [fphoto,setBPhoto] = useState('')
  const [bphoto,setFPhoto] = useState('')
  const [title,setTitle] = useState('')
  const [price,setPrice] = useState('')
  const [offer,setOffer] = useState('')
  const [description,setDescription] = useState('')
  
  const submit = async (e) => {
    
    try{
      setDisabled(true)
      
      let result = await fetch('https://new.iice.foundation/checkProduct',{
        method:'post',
        body:JSON.stringify({ title, price, offer, description }),
        headers:{'Content-Type':'application/json'}
      })
      result = await result.json()
      
      if(result.error){
        setDisabled(false)
        alert(result.error)
      }
      else{
        if(!cphoto || !fphoto || !bphoto){
          setDisabled(false)
          alert('Please Add Photos')
        }
        else{
          let url = 'https://new.iice.foundation/addProduct'
          
          const formData = new FormData()
          formData.append('cphoto',cphoto,cphoto.name)
          formData.append('fphoto',fphoto,fphoto.name)
          formData.append('bphoto',bphoto,bphoto.name)
          formData.append('title',title)
          formData.append('price',price)
          formData.append('offer',offer)
          formData.append('description',description)
          
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
      setDisabled(false)
      alert("Error")
    }
  }
    
    return (
      <div className='container mb-5 body'>
        <h2 className='text-primary mt-4'>Add Product</h2>
        
        <div className="row justify-content-evenly">
          <div className="col-10 col-md-6 col-lg-4 mt-4">
            <label className='p-2'><b>Center Photo</b></label>
            <input type="file" className="form-control" accept='image/*' name="cphoto" 
            onChange={(e)=>setCPhoto(e.target.files[0])} />
          </div>

          <div className="col-10 col-md-6 col-lg-4 mt-4">
            <label className='p-2'><b>Front Photo</b></label>
            <input type="file" className="form-control" accept='image/*' name="bphoto" 
            onChange={(e)=>setBPhoto(e.target.files[0])} />
          </div>
        </div>

        <div className="row justify-content-evenly">
          <div className="col-10 col-md-6 col-lg-4 mt-4">
            <label className='p-2'><b>Back Photo</b></label>
            <input type="file" className="form-control" accept='image/*' name="fphoto" 
            onChange={(e)=>setFPhoto(e.target.files[0])} />
          </div>

          <div className="col-10 col-md-6 col-lg-4 mt-4">
            <label className='p-2'><b>Title</b></label>
            <input type="text" className="form-control" autoComplete='off' placeholder="Enter Product Title" name="title"  
            onChange={(e)=>setTitle(e.target.value)} />
          </div>
        </div>
        

        <div className="row justify-content-evenly">
          <div className="col-10 col-md-6 col-lg-4 mt-4">
            <label className='p-2'><b>Original Price</b></label>
            <input type="text" className="form-control" autoComplete='off' placeholder="Enter Product Price" name="price"  
            onChange={(e)=>setPrice(e.target.value)} />
          </div>
        
          <div className="col-10 col-md-6 col-lg-4 mt-4">
            <label className='p-2'><b>Offer Price</b></label>
            <input type="text" className="form-control" autoComplete='off' placeholder="Enter Offer Price" name="offer"  
            onChange={(e)=>setOffer(e.target.value)} />
          </div>
        </div>

        <div className="row justify-content-evenly">
          <div className="col-9 mt-4">
            <label className='p-2'><b>Description</b></label>
            <textarea type="text" className="form-control" autoComplete='off' placeholder="Short Description....." name="description"  
            onChange={(e)=>setDescription(e.target.value)} />
          </div>
        </div>
        
        <button type="submit" className={`btn btn-primary col-4 col-md-2 mt-4 p-2 ${disabled ? 'disabled' : null}`} onClick={submit}>Submit</button>
      </div>
  )
}

export default AddProduct