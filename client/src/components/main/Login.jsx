import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdPerson } from 'react-icons/io';

function Login() {
  return (
    <div>
      <Link to='/login' className='flex items-center p-3'>
        <IoMdPerson />
        <p>로그인</p>
      </Link>
    </div>
  );
}

export default Login;
