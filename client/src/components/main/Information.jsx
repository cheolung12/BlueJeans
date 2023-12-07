import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RiHomeHeartFill } from 'react-icons/ri';

import lastMain from './mainImg/lastMain.jpeg';
import MainBar from './MainBar';
import MainBar2 from './MainBar2';

const Information = () => {
  //   const [isToolTipVisible, setToolTipVisible] = useState(true);
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const toggleToolTip = () => {
    // setToolTipVisible(!isToolTipVisible);
    setOpen(!open);
  };

  return (
    <>
      {/* // <>    // <div className='relative flex justify-items-start justify-end w-[15rem] pr-4 self-end mt-4 pb-12'> */}
      <div className='absolute flex items-start justify-start m-10 z-20'>
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
                  <div className='flex  items-end justify-center p-4 text-center sm:items-center sm:p-0'>
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
                          <div className='sm:flex sm:items-start'>
                            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
                              <img
                                className='rounded-full'
                                src='https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/20231206180213113jinsu.jpeg'
                              />
                            </div>
                            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                              <Dialog.Title
                                as='h3'
                                className='text-base font-semibold leading-6 text-gray-900'
                              >
                                처음 방문하셨나요?
                              </Dialog.Title>
                              <div className='mt-2'>
                                <p className='text-lg text-black'>
                                  <p className='text-m text-gray-500'>
                                    시니어들의 놀이터 블루진스에 오신것을
                                    환영합니다.
                                  </p>
                                  <p className='text-m text-gray-500'>
                                    다음버튼을 눌러 사용법을 확인해보세요!
                                  </p>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                          <button
                            type='button'
                            className='inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto'
                            onClick={toggleToolTip}
                          >
                            다음
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
      {/* // </div> */}
      <div className='absolute flex items-center justify-center w-full'>
        <div
          className=' md:h-1/2 w-full flex flex-col items-center relative'
          style={{ backgroundPosition: 'bottom' }}
        >
          <img
            src={lastMain}
            alt='main'
            className='md:h-[45rem] h-[40rem] w-full object-cover bg-bottom opacity-90'
          />
          <div className='absolute md:bottom-0 bottom-10  left-0 w-full'>
            {/* 글씨가 안보이고... 어색하다 ㅜ...? ㅠㅜ*/}

            <MainBar2 className='flex items-end' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
