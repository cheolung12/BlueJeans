import React, { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

//////////
import { IoMdBriefcase } from 'react-icons/io';
import { FaBookOpen } from 'react-icons/fa6';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';

// 모달 배열
const modals = [
  {
    id: 1,
    title: '처음 방문하셨나요?',
    content: (
      <>
        <p className='text-m text-gray-500 text-center'>
          시니어의 놀이터 블루진스에 오신것을 환영합니다!
        </p>
        <p className='text-m text-gray-500 text-center'>
          다음버튼을 눌러 사용법을 확인해보세요.
        </p>
        <div className='flex justify-center mt-1'>
          <img
            className='h-36'
            src='https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8.png'
          />
        </div>
      </>
    ),
  },
  {
    id: 2,
    title: '소일거리가 필요하신가요?',
    content: (
      <>
        <p className='text-m text-gray-500 text-center'>
          일자리 버튼을 클릭하면
        </p>
        <p className='text-m text-gray-500 text-center'>
          우리동네 일자리를 확인할 수 있어요.
        </p>
        <div className='flex flex-col justify-center items-center mt-1'>
          <IoMdBriefcase className='text-center h-8 w-8 sm:h-12 md:h-14 sm:w-12 md:w-14 text-[#FE8080] mb-1 ' />
          <p className='font-bold mt-1'>일자리</p>
        </div>
      </>
    ),
  },
  {
    id: 3,
    title: '어디서든 간편하게 읽어보세요',
    content: (
      <>
        <p className='text-m text-gray-500 text-center'>
          클릭 한번으로 다양한 작품을 취향에 따라 읽을 수 있어요.
        </p>
        <div className='flex flex-col justify-center items-center mt-1'>
          <FaBookOpen className='text-center h-8 w-8 sm:h-12 md:h-14 sm:w-12 md:w-14 text-[#FED001] mb-1 ' />
          <p className='font-bold mt-1'>전자책</p>
        </div>
      </>
    ),
  },
  {
    id: 3,
    title: '작가가 되어보세요',
    content: (
      <>
        <p className='text-m text-gray-500 text-center'>
          블루진스 사용자들의 아름다운 작품을 감상해보세요.
        </p>
        <p className='text-m text-gray-500 text-center'>
          그리고 블루진스 백일장으로 나의 감성을 다시 꺼내보세요.
        </p>
        <div className='flex flex-col justify-center items-center mt-1'>
          <FaPenNib className='text-center h-8 w-8 sm:h-12 md:h-14 sm:w-12 md:w-14 text-[#5495B1] mb-1 ' />
          <p className='font-bold mt-1'>백일장</p>
        </div>
      </>
    ),
  },
  {
    id: 4,
    title: '진수에게 물어봐',
    content: (
      <>
        <p className='text-m text-gray-500 text-center'>
          오늘의 날씨? 요즘 트랜드?
        </p>
        <p className='text-m text-gray-500 text-center'>
          인공지능 진수에게 무엇이든 물어보세요!
        </p>
        <div className='flex flex-col justify-center items-center mt-1'>
          <MdChat className='text-center h-8 w-8 sm:h-12 md:h-14 sm:w-12 md:w-14 text-[#6694D5] mb-1 ' />
          <p className='font-bold mt-1'>챗봇</p>
        </div>
      </>
    ),
  },
  {
    id: 5,
    title: '길을 잃었나요?',
    content: (
      <>
        <p className='text-m text-gray-500 text-center'>
          지금 당신은 어디에 계신가요?
        </p>
        <p className='text-m text-gray-500 text-center'>
          집으로 가는 가장 빠른 길을 알려드려요.
        </p>
        <div className='flex flex-col justify-center items-center mt-1'>
          <IoHome className='text-center h-8 w-8 sm:h-12 md:h-14 sm:w-12 md:w-14 text-[#8D62E9] mb-1 ' />
          <p className='font-bold mt-1'>집찾기</p>
        </div>
      </>
    ),
  },
  {
    id: 6,
    title: '함께해요',
    content: (
      <>
        <p className='text-m text-gray-500 text-center'>
          당신의 일상을 더욱 다양하게 만들어드릴게요.
        </p>
        <p className='text-m text-gray-500 text-center'>
          이제, 블루진스를 시작해볼까요?
        </p>
        <div className='flex justify-center mt-1'>
          <img
            className='h-36'
            src='https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8.png'
          />
        </div>
      </>
    ),
  },
];

const Information = () => {
  const [currentModalIndex, setCurrentModalIndex] = useState(0);
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const toggleToolTip = () => {
    // setToolTipVisible(!isToolTipVisible);
    setOpen(!open);
  };

  useEffect(() => {
    if (!getCookie('BlueJeans_info')) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    console.log(getCookie('BlueJeans_info'));
  }, []);

  const openNextModal = () => {
    // 마지막 모달이 아니라면 다음 모달을 열기
    if (currentModalIndex < modals.length - 1) {
      setCurrentModalIndex(currentModalIndex + 1);
    } else {
      // 마지막 모달이라면 모달 닫기
      setCurrentModalIndex(0);
      setOpen(false);
      if (!getCookie('BlueJeans_info')) {
        setCookie('BlueJeans_info', 'hidden', 365);
      }
    }
  };
  const currentModal = modals[currentModalIndex];

  //쿠키저장
  function setCookie(cookieName, value, exdays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays); // 쿠키 저장 기간
    let cookieValue =
      escape(value) +
      (exdays == null ? '' : '; expires=' + exdate.toGMTString());
    document.cookie = cookieName + '=' + cookieValue;
  }

  //쿠키 조회
  function getCookie(cookieName) {
    cookieName = cookieName + '=';
    let cookieData = document.cookie;
    let start = cookieData.indexOf(cookieName);
    let cookieValue = '';

    if (start != -1) {
      start += cookieName.length;
      let end = cookieData.indexOf(';', start);
      if (end == -1) end = cookieData.length;
      cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
  }

  //쿠키삭제
  function deleteCookie(cookieName) {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie =
      cookieName + '= ' + '; expires=' + expireDate.toGMTString();
  }

  return (
    <>
      {/* // <>    // <div className='relative flex justify-items-start justify-end w-[15rem] pr-4 self-end mt-4 pb-12'> */}
      <div className='absolute flex items-start justify-start m-20 z-20'>
        <button
          type='button'
          onClick={toggleToolTip}
          className='flex rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
        >
          <FaQuestionCircle className='md:flex items-center mr-2 mt-1' />
          사용설명서
        </button>
      </div>
      {/* <FaQuestionCircle className='h-10 w-10 md:flex items-center' /> */}
      {open && (
        <div className='absolute right-full mt-2 text-black z-50'>
          <div className='z-20'>
            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as='div'
                className='relative z-20'
                initialFocus={cancelButtonRef}
                // onClose={setOpen(false)}
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                  <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    {/* min-h-full */}
                    <Transition.Child
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                      enterTo='opacity-100 translate-y-0 sm:scale-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                      leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                      <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                        <div className='bg-white px-5 pb-4 pt-5 h-[300px] sm:p-6 sm:pb-4'>
                          <div className='h-full sm:flex sm:items-center justify-center'>
                            {/* <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
                              <img
                                className='rounded-full'
                                src='https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/20231206180213113jinsu.jpeg'
                              />
                            </div> */}
                            <div className='mt-3 text-center sm:mt-0 sm:text-left'>
                              <Dialog.Title
                                as='h3'
                                className='text-2xl text-center font-semibold leading-6 text-gray-900 mb-5'
                              >
                                {currentModal.title}
                              </Dialog.Title>
                              <div className='mt-2'>
                                <p className='text-lg text-black'>
                                  {currentModal.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                          <button
                            type='button'
                            className='inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto'
                            onClick={openNextModal}
                          >
                            {currentModalIndex < modals.length - 1
                              ? '다음'
                              : '다시보지않기'}
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        </div>
      )}
      {/* </button> */}
    </>
  );
};

export default Information;
