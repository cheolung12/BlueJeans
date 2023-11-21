import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

export default function Navbar() {
  <>
    <div className=' flex justify-center'>
      <div className=' rounded-[30px] shadow-md items-center flex justify-around bg-white h-24 w-3/4 mb-16 '>
        <Link to='/' className=''>
          <p className='text-[#FE8080]'>
            <IoMdBriefcase className='' />
            일자리
          </p>
        </Link>

        <Link to='/ebook' className=''>
          <p className='text-[#FED001]'>
            <FiBookOpen />
            e-book
          </p>
        </Link>

        <Link to='/essay' className=''>
          <p className='text-[#5495B1]'>
            <FaPenNib />
            백일장
          </p>
        </Link>
        <Link to='/chat' className=''>
          <p className='text-[#6694D5]'>
            <MdChat />
            챗봇
          </p>
        </Link>
        <Link to='/findhome' className=''>
          <p className='text-[#8D62E9]'>
            <GoHome />
            집찾기
          </p>
        </Link>
      </div>
    </div>
  </>;
}
