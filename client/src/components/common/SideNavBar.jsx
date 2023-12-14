import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdBriefcase } from 'react-icons/io';
import { FaBookOpen } from 'react-icons/fa6';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';

export default function SideNavBar() {
  return (
    <div className='lg:fixed block z-10 bg-white  2xl:top-52 lg:top-40  3xl:left-[17%] 2xl:left-[10%] lg:left-20'>
      <div className='flex lg:flex-col flex-row lg:space-y-10 space-y-0 lg:space-x-0 sm:space-x-8  space-x-1 lg:py-10 py-8 lg:px-10 sm:px-10 px-2 border rounded-lg shadow-lg lg:mb-0 mb-12'>
        <Link to='/recruitment' className='sideNav-link'>
          <p>
            <IoMdBriefcase className='sideNav-icon text-[#FE8080]' />
          </p>
          <p className='sideNav-text'>일자리</p>
        </Link>
        <Link to='/ebook' className='sideNav-link'>
          <p>
            <FaBookOpen className='sideNav-icon text-[#FED001]' />
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
            <IoHome className='sideNav-icon text-[#8D62E9]' />
          </p>
          <p className='sideNav-text'>집찾기</p>
        </Link>
      </div>
    </div>
  );
}
