import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from "../../assets/logo.png";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

export const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

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

        try {
            const response = await fetch('http://127.0.0.1:5500/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    role: role
                }),
            });

            if (!response.ok) {
                throw new Error('Error: ' + response.statusText);
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

                if (decodedToken.sub.role === 'seller') {
                    navigate('/seller/dashboard');
                }
                else if (decodedToken.sub.role === 'deliverer') {
                    navigate('/deliverer/dashboard');
                }
                else if (decodedToken.sub.role === 'buyer') {
                    navigate('/buyer/home');
                }
                else {
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
            <div className='flex flex-col p-6 h-auto w-[350px] md:w-[450px] md:h-auto bg-Primary rounded-lg shadow-md'>
                <img className='self-center mb-4' src={logo} alt="Logo" />
                <h1 className='text-center mb-4 text-xl font-bold text-Text'>Join Our Community</h1>
                <p className='text-center text-base text-Variant2 mb-4'>Sign up to start your journey</p>
                <form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
                    <input
                        className='border p-2 rounded-[8px] outline-none text-Variant2'
                        type="text"
                        placeholder="Full Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className='border p-2 rounded-[8px] outline-none text-Variant2'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className='border py-2 pr-2 rounded-[8px] outline-none text-Variant2'>
                        <select
                            className='p-1 outline-none text-Variant2 bg-Primary w-full'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Select a role</option>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                            {/* <option value="deliverer">Deliverer</option> */}
                        </select>
                    </div>
                    <div className='relative border p-2 rounded-[8px]'>
                        <input
                            className=' text-Variant2 pr-10 outline-none'
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                            {passwordVisible ? (
                                <PiEyeSlash className='fill-Variant2' onClick={togglePasswordVisibility} />
                            ) : (
                                <PiEyeLight className='fill-Variant2' onClick={togglePasswordVisibility} />
                            )}
                        </div>
                    </div>
                    <button
                        className='bg-Variant text-Primary p-2 rounded-[8px] mt-4'
                        type='submit'
                    >
                        Sign Up
                    </button>
                    <p
                        className='text-center mt-4 text-sm font-normal text-Variant2'>
                        Already a member?
                        <Link className='text-Secondary' to="/signin"> Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}