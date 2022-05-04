import './Login.scss';
import React, {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";

const LOGIN_URL = 'http://localhost:8100/login';

export default function Login() {

  const history = useHistory();
  const [message, setMessage] = useState('');

  async function submit(event) {
    event.preventDefault();
    const formElement = document.forms['form'];
    const formData = new FormData(formElement);
    const email = formData.get('email');
    const password = formData.get('password');
    setMessage('');
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'GET',
        headers: {
          'email': email,
          'password': password
        },
      })
      if (response.ok) {
        console.log('logged in')
        history.push('/dashboard');
        return;
      }
    } catch (error) {
      console.log('Error: ' + error.message);
    }
    setMessage('Please try again!');
  }

  return (
    <div className='Login'>
      <form id='form'
            onSubmit={ event => submit(event) }>
        <div className='header'>
          <h2>Login</h2>
          <div> or <NavLink to="/signup">sign up</NavLink>!</div>
        </div>
        <div className='input-group'>
          <div>E-Mail</div>
          <input type='email' name='email'/>
        </div>
        <div className='input-group'>
          <div>Password</div>
          <input type='password' name='password'
          />
        </div>
        <div className='submit-group'>
          <input type='submit' value='Log in'/>
          <div className='Message'>{message}</div>
        </div>
      </form>
    </div>
  )
}