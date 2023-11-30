import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookCardDetail from '../../components/Ebook/Detail/BookCardDetail';
import axios from 'axios';

export default function EBookDetail() {
  const { bookId } = useParams();

  const [booksContent, setBooksContent] = useState({
    title: '',
    id: '',
    author: '',
    thumbnail: '',
    like: 0,
    publisher: '',
    genre: '',
    description: '',
  });

  // get요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/ebook/detail/${bookId}`,
          withCredentials: true,
        });
        setBooksContent(response.data);
        console.log(response);
      } catch (error) {
        console.log(`${process.env.REACT_APP_SERVER}/ebook/detail/${bookId}`);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // map 대신 find 사용
  // const findBook = books.find((book) => book.id === bookId);

  // <Link>에서 bookcard 데이터 받아옴
  // const location = useLocation();
  // console.log(location.state);

  return (
    <div className='flex w-[91%] min-w-200 justify-end'>
      <div className='w-[80%] ]'>
        {/* <Title /> */}
        <div>
          <div>
            <BookCardDetail
              id={booksContent.id}
              title={booksContent.title}
              thumbnail={booksContent.thumbnail}
              author={booksContent.author}
              publisher={booksContent.publisher}
              genre={booksContent.genre}
              ISBN={booksContent.genre}
              description={booksContent.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
