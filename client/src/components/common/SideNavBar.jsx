import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdBriefcase } from 'react-icons/io';
import { FiBookOpen } from 'react-icons/fi';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { GoHome } from 'react-icons/go';

export default function SideNavBar() {
    return (
        <div className="flex">
            <div className="flex flex-col space-y-8 p-14 border rounded-lg shadow-lg">
                <Link to="/recruitment" className="m-3">
                    <p className="h-16 w-16 flex justify-center text-[#FE8080]">
                        <IoMdBriefcase className="h-full w-full" />
                    </p>
                    <p className="text-lg text-center font-semibold">일자리</p>
                </Link>
                <Link to="/ebook" className="m-3">
                    <p className="h-16 w-16 flex justify-center text-[#FED001]">
                        <FiBookOpen className="h-full w-full" />
                    </p>
                    <p className="text-lg text-center font-semibold">e-Book</p>
                </Link>
                <Link to="/essay" className="m-3">
                    <p className="h-16 w-16 flex justify-center text-[#5495B1]">
                        <FaPenNib className="h-full w-full" />
                    </p>
                    <p className="text-lg text-center font-semibold">백일장</p>
                </Link>
                <Link to="/chat" className="m-3">
                    <p className="h-16 w-16 flex justify-center text-[#6694D5]">
                        <MdChat className="h-full w-full" />
                    </p>
                    <p className="text-lg text-center font-semibold">챗봇</p>
                </Link>
                <Link to="/findhome" className="m-3">
                    <p className="h-16 w-16 flex justify-center text-[#8D62E9]">
                        <GoHome className="h-full w-full" />
                    </p>
                    <p className="text-lg text-center font-semibold">집찾기</p>
                </Link>
            </div>
        </div>
    );
}
