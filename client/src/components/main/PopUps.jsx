import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

//////////
import { IoMdBriefcase } from 'react-icons/io';
import { FaBookOpen } from 'react-icons/fa6';
import { FaPenNib } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';
import lastMain from './mainImg/lastMain.jpeg';

export default function PopUps() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {/* 모달 오픈 버튼  */}
      <div className='absolute flex items-start justify-start m-10 z-20'>
        <button
          type='button'
          onClick={openModal}
          className='rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
        >
          사용설명서
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-30' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 ' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-bold leading-6 text-gray-900'
                  >
                    반가워요!
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-m text-gray-500'>
                      시니어들의 놀이터 블루진스에 오신것을 환영합니다
                    </p>
                    <p className='text-m text-gray-500'>
                      블루진스에 처음 방문하셨다면 다음버튼을 눌러 사용법을
                      확인해보세요!
                    </p>
                  </div>

                  <div className='mt-4 flex items-end justify-center z-20 '>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-bold text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      다음
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
