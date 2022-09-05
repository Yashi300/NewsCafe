import React, {useContext, useEffect} from 'react'
import noteContext from "../context/notes/noteContext"

const Account = () => {
    const context = useContext(noteContext);
    const { getUser, user } = context;
    useEffect(() => {
      if(localStorage.getItem('token')){
          getUser()
      }
      // eslint-disable-next-line
  }, [])
  return (
    <>
    <div className='container top'>
        <div className="card text-center">
  <div className="card-header">
    Your Account Details
  </div>
  <div className="card-body">
    <div className="box my-3">
      <h3  style={{display: "inline"}} >Your Username  : </h3>
      <span>{user.name}</span>
    </div>
    <div className="box my-3">
      <h3  style={{display: "inline"}} >Your Email Id  : </h3>
      <span>{user.email}</span>
    </div>
  </div>
  <div className="card-footer text-muted">
    <h3>Account created on</h3>
    {user.date}
  </div>
</div>
    </div>
    </>
  )
}

export default Account