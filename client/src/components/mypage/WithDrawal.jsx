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
    <div className='mt-48 m-3 flex justify-center flex-col items-center space-y-2'>
      <div
        className='text-gray-600 rounded-md px-3 py-2 cursor-pointer'
        onClick={exit}
      >
        회원 탈퇴
      </div>
    </div>
  );
}
