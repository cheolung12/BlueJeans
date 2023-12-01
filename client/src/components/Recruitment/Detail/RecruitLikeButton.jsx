import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { useParams } from 'react-router-dom';

export default function RecruitLikeButton({ isHeart, allHeart }) {
    const { jobId } = useParams();

    //찜하기 버튼
    const onClick = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER}/jobs/like/${jobId}`,
                withCredentials: true,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div></div>
            <div className="flex flex-row items-center cursor-pointer" onClick={onClick}>
                {isHeart ? <IoMdHeart className="text-4xl text-red-600" /> : <IoMdHeartEmpty className="text-4xl text-gray-700" />}
            </div>
        </div>
    );
}
