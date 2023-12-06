import React from 'react';

import { PuffLoader } from 'react-spinners';

const Sktelecom = () => {

    <div className=' animate-pulse flex items-center justify-center bg-slate-200  md:w-[40rem] lg:w-[53rem] xl:w-[53.125rem]   pt-7 rounded  w-full h-[25rem] lg:h-[30rem] drop-shadow-md'>

      <PuffLoader
        height='80'
        width='80'
        radius='9'
        color='#4a85d9'
        ariaLabel='loading'
        wrapperStyle
        wrapperClass
      />
    </div>
    // <div className='animate-pulse flex items-center justify-center bg-gray-300 w-[53.125rem] h-[34.375rem] rounded'>
    //   <FaMountainSun className='h-24 w-24 opacity-30' />
    // </div>
  );
};

export default Sktelecom;
