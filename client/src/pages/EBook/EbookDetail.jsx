import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Title from '../../components/Ebook/Main/Title';
import BookCardDetail from '../../components/Ebook/Detail/BookCardDetail';
import SideNavBar from '../../components/common/SideNavBar';

export default function EBookDetail() {
  const { bookId } = useParams();
  // map 대신 find 사용
  // const findBook = books.find((book) => book.id === bookId);

  // <Link>에서 bookcard 데이터 받아옴
  const location = useLocation();
  // console.log(location.state);

  return (
    <div>
      <SideNavBar />
      <Title />
      <div>
        <div>
          {/* 데이터 props로 넘겨줌 */}
          <BookCardDetail data={location.state.dataDetail} />
        </div>
      </div>
    </div>
  );
}
