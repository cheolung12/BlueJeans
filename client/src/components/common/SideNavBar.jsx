import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

export default function SideNavBar() {
    return (
        <div className="flex justify-center">
            <div>
                <Link to="/recruitment" className="">
                    <p className="flex justify-center text-[#FE8080]">
                        <IoMdBriefcase />
                    </p>
                    <p className="text-center font-semibold">일자리</p>
                </Link>
                <Link to="/ebook" className="">
                    <p className="flex justify-center text-[#FED001]">
                        <FiBookOpen />
                    </p>
                    <p className="text-center font-semibold">e-Book</p>
                </Link>
                <Link to="/essay" className="">
                    <p className="flex justify-center text-[#5495B1]">
                        <FaPenNib />
                    </p>
                    <p className="text-center font-semibold">백일장</p>
                </Link>
                <Link to="/chat" className="">
                    <p className="flex justify-center text-[#6694D5]">
                        <MdChat />
                    </p>
                    <p className="text-center font-semibold">챗봇</p>
                </Link>
                <Link to="/findhome" className="">
                    <p className="flex justify-center text-[#8D62E9]">
                        <GoHome />
                    </p>
                    <p className="text-center font-semibold">집찾기</p>
                </Link>
            </div>
        </div>
    );
}
