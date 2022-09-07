import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password: ""})
    const navigate = useNavigate();

const handleSubmit =async (e)=>{
    e.preventDefault();
    const response = await fetch(`https://newscafebackend.herokuapp.com/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      });
      const json = await response.json();
      if(json.success){
        //Save the auth-token and redirect
        localStorage.setItem('token', json.authtoken)
        props.showAlert(" Login successful! ", "success")
        navigate('/');
      } else { 
        props.showAlert(" Invalid credentials", "warning")
        setCredentials({email:"", password: ""});
      }
      console.log(json);
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
    <div className='top'>
        <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" name='email' id="email" value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" name='password' id="password" value={credentials.password} placeholder="Password" autoComplete="off" onChange={onChange} />
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login