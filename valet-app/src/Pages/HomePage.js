import React from 'react'
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:"1rem"}}>
      <Link to="/login">Login</Link>
      <div style={{marginLeft:"1rem"}}>
      <Link to="/signup">Signup</Link>
      </div>
      
      
    </div>
  )
}

export default HomePage