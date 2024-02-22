import React, {useEffect, useState, useRef} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './SignUp.css';

function SignUp() {
const [returnedData, setReturnedData] = useState(['']);
const [customer, setCustomer] = useState({Email:'', Name: '' , PhoneNo: '', Address: '', Password:''});
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const alertRef = useRef(null);
const navigate = useNavigate();

const setInput = (e) => {
    const {name,value} = e.target;
    console.log(value);
    setCustomer(prevState => ({
      ...prevState,
      [name] : value
    }));
  }
  const addcustomer = async() => {
    if(customer.Email==='' || customer.Name==='' || customer.Address==='' || customer.PhoneNo==='' || customer.Password===''){
      setErrorMessage('Please Fill all the details');
      return;
    }
    const newData = await fetch('http://localhost:5000/customeradd',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body : JSON.stringify({
        ...customer
      })
    })
    .then(res => res.json())
    if(Array.isArray(newData)){
      setReturnedData(newData);
      setSuccessMessage('Added Successfully!');
      console.log(newData);
      navigate('*');
  }
};

useEffect(() => {
  if (alertRef.current) {
    alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}, [errorMessage, successMessage]);

useEffect(() => {
  const timeoutId = setTimeout(() => {
    setErrorMessage('');
    setSuccessMessage('');
  }, 3000);
  return () => clearTimeout(timeoutId);
}, [errorMessage, successMessage]);

  return (
    <div className="signup-form">
      {errorMessage && (
        <div className="message-box error" ref={alertRef}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="error" onClose={() => setErrorMessage('')}>
              {errorMessage}
            </Alert>
          </Stack>
        </div>
      )}
      {successMessage && (
        <div className="message-box success" ref={alertRef}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="success" onClose={() => setSuccessMessage('')}>
              {successMessage}
            </Alert>
          </Stack>
          </div>
      )}
      <h2>Sign Up</h2>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="Email"
          onChange={setInput}
          required
        ></input>

        <label >Name:</label>
        <input
          type="text"
          name="Name"
          onChange={setInput}
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="PhoneNo"
          maxLength={10}
          onChange={setInput}
          required
        ></input>

        <label >Address:</label>
        <input
          type="text"
          name="Address"
          onChange={setInput}
          required
        ></input>

        <label>Password:</label>
        <input
          type="password"
          name="Password"
          onChange={setInput}
          required
        ></input>

        <button type="submit" onClick={() => addcustomer()}>Sign Up</button>
      </div>
      <div className="signup-link">
        <p>Alreay Have an account? <Link to="*">Login</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
