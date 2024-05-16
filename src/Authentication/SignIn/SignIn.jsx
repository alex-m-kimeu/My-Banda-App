import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from "../../assets/logo.png";

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const refreshToken = useRef(async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await fetch('http://127.0.0.1:5500/refresh-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('refreshToken', data.refresh_token);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expiresIn = decodedToken.exp * 1000 - new Date().getTime();
        setTimeout(refreshToken.current, expiresIn - 60000);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPasswordError('');

    try {
      const response = await fetch('http://127.0.0.1:5500/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setPasswordError('Incorrect password');
        } else {
          throw new Error('Error: ' + response.statusText);
        }
        return;
      }

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        let decodedToken;
        try {
          decodedToken = jwtDecode(data.access_token);
        } catch (error) {
          console.error("Invalid token", error);
          return;
        }
        localStorage.setItem('role', decodedToken.sub.role);

          if (decodedToken.sub.role === 'admin') {
            navigate('/admin/dashboard');
          } else if (decodedToken.sub.role === 'seller') {
            navigate('/seller/dashboard');
          } else if (decodedToken.sub.role === 'buyer') {
            navigate('/buyer/home');
          } else if (decodedToken.sub.role === 'deliverer') {
            navigate('/deliverer/dashboard');
          } else {
            throw new Error('Invalid role');
          }
        } else {
          console.error('Access token is missing in the response');
        }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-Primary'>
      <div className='flex flex-col p-6 h-auto w-[350px] md:w-[400px] md:h-auto bg-Primary rounded-lg shadow-md'>
        <img className='self-center mb-4' src={logo} alt="Logo" />
        <h1 className='text-center mb-4 text-xl font-bold text-Text'>Welcome Back</h1>
        <form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
          <input
            className='border p-2 rounded-[8px] outline-none text-Variant2'
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className='border p-2 rounded-[8px] outline-none text-Variant2'
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {passwordError && <p className='text-Red text-sm text-center'>{passwordError}</p>}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2 text-sm font-normal text-Variant2'>
              <input type='checkbox' checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
              <label>Remember me</label>
            </div>
            <p className='text-Secondary cursor-pointer text-sm font-normal'>Forgot password?</p>
          </div>
          <button
            className='bg-Variant text-Primary p-2 rounded-[8px] mt-4'
            type="submit"
          >
            Sign in
          </button>
          <p
            className='text-center mt-4 text-sm font-normal text-Variant2'>
            Not a member yet?
            <Link className='text-Secondary' to="/signup"> Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}