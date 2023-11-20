import React from 'react';
import BookViewer from '../../components/Ebook/Viewer/BookViewer';
import bookContents from '../../data/bookContents.json';

export default function EBookViewer() {
  return (
    // <div className='flex justify-center'>
    //   <div className='w-4/5 h-96 bg-gray-200 flex justify-center'>
    //     <button>이전</button>
    //     <div className='w-5/6 h-82 flex justify-center items-center'>
    //       <div className='w-2/5 h-80 bg-gray-100 p-5 border border-black'>
    //         text
    //       </div>
    //       <div className='w-2/5 h-80 bg-gray-100 p-5 border border-black'>
    //         text
    //       </div>
    //     </div>
    //     <button>다음</button>
    //   </div>
    // </div>

    <div>
      <BookViewer data={bookContents.bookContents} />
    </div>
  );
}
