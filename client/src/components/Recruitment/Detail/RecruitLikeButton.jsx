import React, { useState } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { useParams } from 'react-router-dom';

export default function RecruitLikeButton({ countlike, mylike }) {
    const { jobId } = useParams();

    console.log(jobId);
    console.log('받아온 좋아요수:', countlike);
    console.log('내 좋아요수:', mylike);
    const isMyHeart = mylike;
    const isCount = countlike;
    // 하트 색상 변경
    const [isLikeAdd, setIsLikeAdd] = useState(isMyHeart);
    // 찜하기 수 카운트
    const [likeCount, setLikeCount] = useState(isCount);

    //찜하기 버튼
    const onClick = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER}/jobs/like/${jobId}`,
                withCredentials: true,
            });
            console.log(response);
            if (response.data.dibResult == 'DIB_REMOVED') {
                setIsLikeAdd(false);
                setLikeCount((prev) => prev - 1);
            } else if (response.data.dibResult == 'DIB_ADDED') {
                setIsLikeAdd(true);
                setLikeCount((prev) => prev + 1);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log('좋아요수', countlike);

    return (
        <div className="flex flex-row items-center cursor-pointer" onClick={onClick}>
            {mylike ? (
                <div>
                    <IoMdHeart className="text-4xl text-red-600" />
                    {likeCount}
                </div>
            ) : (
                <div>
                    <IoMdHeartEmpty className="text-4xl text-gray-700" />
                    {likeCount}
                </div>
            )}
        </div>
    );
}
