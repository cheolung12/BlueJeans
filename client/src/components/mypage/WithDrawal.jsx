import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function WithDrawal() {
    const navigate = useNavigate();

    // 회원 탈퇴
    const exit = async () => {
        if (window.confirm('※ 회원을 탈퇴하면 회원님이 작성한 모든 게시물이 삭제되고 각 좋아요 목록이 사라집니다. \n\n 정말 삭제하시겠습니까?')) {
            try {
                const response = await axios({
                    method: 'DELETE',
                    url: `${process.env.REACT_APP_SERVER}/user`,
                    withCredentials: true,
                });
                console.log(response);
                alert('회원 탈퇴가 완료되었습니다. \n\n 그동안 블루진스를 이용해주셔서 감사합니다.');
                localStorage.clear();
                navigate('/');
            } catch (error) {
                console.error('Error data:', error);
                alert('※ 회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
            }
        } else {
            alert('회원 탈퇴가 취소되었습니다.');
        }
    };

    return (
        <div className="text-center mt-28">
            <div className="text-gray-800 font-semibold rounded-md px-3 py-2 cursor-pointer" onClick={exit}>
                회원 탈퇴
            </div>
        </div>
    );
}
