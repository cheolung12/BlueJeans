import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

export default function SideNavBar() {
  return (
    <div className='sm:fixed block z-1 bg-white 2xl:top-52 xl:top-44 lg:top-36 top-24 '>
      <div className='flex sm:flex-col flex-row sm:space-y-10 space-y-0 sm:space-x-0 space-x-1 sm:py-10 py-8 sm:px-10 px-2 border rounded-lg shadow-lg sm:mb-0 mb-12'>
        <Link to='/recruitment' className='sideNav-link'>
          <p>
            <IoMdBriefcase className='sideNav-icon text-[#FE8080]' />
          </p>
          <p className='sideNav-text'>일자리</p>
        </Link>
        <Link to='/ebook' className='sideNav-link'>
          <p>
            <FiBookOpen className='sideNav-icon text-[#FED001]' />
          </p>
          <p className='sideNav-text'>e-book</p>
        </Link>
        <Link to='/essay' className='sideNav-link'>
          <p>
            <FaPenNib className='sideNav-icon text-[#5495B1]' />
          </p>
          <p className='sideNav-text'>백일장</p>
        </Link>
        <Link to='/chat' className='sideNav-link'>
          <p>
            <MdChat className='sideNav-icon text-[#6694D5]' />
          </p>
          <p className='sideNav-text'>챗봇</p>
        </Link>
        <Link to='findhome' className='sideNav-link'>
          <p>
            <GoHome className='sideNav-icon text-[#8D62E9]' />
          </p>
          <p className='sideNav-text'>집찾기</p>
        </Link>
      </div>
    </div>
  );
}
