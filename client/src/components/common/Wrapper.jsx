import React from 'react';

export default function Wrapper({ children }) {
  return <div className='max-w-screen-xl xl:mx-auto'>{children}</div>;
}
