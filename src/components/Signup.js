import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"", email:"", password: "", cpassword:""})
  const navigate = useNavigate();

const handleSubmit =async (e)=>{
  e.preventDefault();
 const {name, email, password, cpassword} = credentials;
 if(password !== cpassword){
   setCredentials({name:"", email:"", password:"", cpassword:""});
   alert("Password and confirm password must be the same");
} else {
  const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    if(json.success){
      //Save the auth-token and redirect
      localStorage.setItem('token', json.authtoken)
      navigate('/');
      props.showAlert("Signup successful! Your account is created.", "success")
    } else { 
      setCredentials({name:"", email:"", password:"", cpassword:""});
      props.showAlert("Invalid credentials", "warning")
    }
    console.log(json);
  }
}

const onChange = (e)=>{
  setCredentials({...credentials, [e.target.name]: e.target.value})
}


  return (
    <div className='container top'>
       <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} placeholder="Enter name" />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={8} required placeholder="Password" />
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={8} required placeholder="Confirm Password" />
    {/* <input type="password" placeholder="Confirm Password" id="confirm_password" required></input> */}
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form> 
    </div>
  )
}

export default Signup