import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RiHomeHeartFill } from 'react-icons/ri';
import houseBtnG from './houseBtnG.gif';

const HowToUse = () => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
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
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-60 overflow-y-auto '>
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <RiHomeHeartFill
                        className='h-6 w-6 text-blue-600'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='mt-3 text-center sm:mt-0 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-2xl text-center font-semibold leading-6 text-gray-900 mb-5'
                      >
                        집찾기 페이지
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-lg text-black'>
                          <div className='pt-5'>
                            <div className='flex'>
                              <img
                                src={houseBtnG}
                                alt='findhome'
                                className='p-2'
                              />
                              <p className='pt-4'>
                                지금 당신은 어디에 계신가요? 가장 빠른 길을
                                찾아드립니다 상단에 있는 집찾기 버튼을 눌러
                                보세요!
                              </p>
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto'
                    onClick={() => setOpen(false)}
                  >
                    집찾으러 가기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default HowToUse;
