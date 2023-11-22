import React from 'react';

export default function SignupInput({type, label, name, value, handleChange}) {
  return (
    <div className='signup-input-wrapper'>
      <label htmlFor={name} className='signup-input-label'>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value} 
        onChange={handleChange}
        className='signup-input'
      />
    </div>
  );
}
