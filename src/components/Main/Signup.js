import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()

  const [disabled,setDisabled] = useState(false)
  const [user,setUser] = useState({ name: '', email: '', password: '', cpassword: '', post: 'admin' })

  let name, value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const submit = async () => {
    setDisabled(true)
    const { name, email, password, cpassword, post } = user
    
    let result = await fetch('https://new.iice.foundation/signup',{
      method:'post',
      body:JSON.stringify({ name, email, password, cpassword, post }),
      headers:{'Content-Type':'application/json'}
    })
    result = await result.json()
    
    if(result.message){
      alert(result.message)
      navigate('/login')
    }
    else{
      setDisabled(false)
      alert(result.error)
    }
  }

  return (
    <div className='container mb-5 body'>
      <h2 className='text-primary mt-4'>Signup</h2>
      
      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <input type="text" className="form-control" autoComplete='off' placeholder="Enter Name" name="name"  
          value={user.name} onChange={handleInputs} />
        </div>
      </div>
      
      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <input type="email" className="form-control" autoComplete='off' placeholder="Enter Email" name="email"  
          value={user.email} onChange={handleInputs} />
        </div>
      </div>
      
      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <input type="password" className="form-control" autoComplete='off' placeholder="Enter Password" name="password"  
          value={user.password} onChange={handleInputs} />
        </div>
      </div>

      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <input type="password" className="form-control" autoComplete='off' placeholder="Confirm Password" name="cpassword"  
          value={user.cpassword} onChange={handleInputs} />
        </div>
      </div>

      <button type="submit" className={`btn btn-primary col-4 col-md-2 mt-4 p-2 ${disabled ? 'disabled' : null}`} onClick={submit}>Submit</button>
      
      <div className="row justify-content-evenly">
        <div className="col-10 col-md-6 col-lg-4 mt-4">
          <NavLink className='link' to='/login'>Already have an account?</NavLink>
        </div>
      </div>
      
    </div>
  )
}

export default Signup
