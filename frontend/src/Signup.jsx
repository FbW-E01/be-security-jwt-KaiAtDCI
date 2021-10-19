import React, {useState} from "react";
import './Signup.scss';
import {useHistory} from "react-router-dom";

const SIGNUP_URL = 'http://localhost:8100/register';

export default function Signup() {

  const history = useHistory();
  const [message, setMessage] = useState('');

  async function signup(event) {
    console.log('signup')
    event.preventDefault();
    const formElement = document.forms['form'];
    const formData = new FormData(formElement);
    const email = formData.get('email');
    const password = formData.get('password');

    setMessage('');
    const response = await fetch(SIGNUP_URL, {
      method: 'GET',
      headers: {
        'email': email,
        'password': password
      },
    })
    if (response.ok) {
      history.push('/dashboard');
      return;
    }
    setMessage('Please try again.');
  }

  return (
    <div className='Signup'>
      <form id='form'
            onSubmit={event => signup(event)}>
        <h2>Sign up</h2>
        <div className='input-group'>
          <div>E-Mail</div>
          <input type='email' name='email'/>
        </div>
        <div className='input-group'>
          <div>Password</div>
          <input type='password' name='password'/>
        </div>
        <div className='submit-group'>
          <input type='submit' value='Sign up'/>
          <div className='Message'>{message}</div>
        </div>
      </form>
    </div>
  )
}