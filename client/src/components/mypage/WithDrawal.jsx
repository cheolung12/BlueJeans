import React from 'react';
import axios from 'axios';

export default function WithDrawal() {
  // 회원 탈퇴
  const exit = async () => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_SERVER}/user`,
        withCredentials: true,
      });
      console.log(response);
      alert('회원 탈퇴가 완료되었습니다.');
    } catch (error) {
      console.error('Error data:', error);
    }
  };

  return (
    <div className='text-center mt-28'>
      <div
        className='text-gray-800 font-semibold rounded-md px-3 py-2 cursor-pointer'
        onClick={exit}
      >
        회원 탈퇴
      </div>
    </div>
  );
}
