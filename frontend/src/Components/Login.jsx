import React, { useState } from 'react';

const Login = () => {

  const [email , setEmail] = useState('');
const [password , setPassword] = useState('');

const handleSubmit = () => {
  const payload = {
    email,
    password
  }
  fetch(`http://localhost:8080/user/login`, {
    method : "POST",
    headers: {
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify(payload)
  })
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
}


  return (
    <div>
      <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login;
