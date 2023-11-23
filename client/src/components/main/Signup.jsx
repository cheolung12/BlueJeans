import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div>
      <Link to='/signup'>
        <p className='p-3'>회원가입</p>
      </Link>
    </div>
  );
}

export default Signup;
