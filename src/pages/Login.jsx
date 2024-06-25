import React from 'react'
import './styles/Login.css'
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
    return (
        <div>
            <Header />
            <div className='login'>
                <h2 className='font-bold'>Login</h2>
                <form id='LoginForm' method='post' action='/inventory'>
                        <input type='email' name='email' id='email' placeholder='Enter email *' />
                        <input type='password' name='password' id='password' placeholder='Enter password *' />
                        <input type='submit' value='Login' id='login' className='cursor-pointer'/>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Login