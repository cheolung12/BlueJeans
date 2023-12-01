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
    heart: false,
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
        console.log('찜하기 여부', response.data.heart);
      } catch (error) {
        console.log(`${process.env.REACT_APP_SERVER}/ebook/detail/${bookId}`);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex w-[91%] min-w-200 justify-end'>
      <div className='w-[80%] ]'>
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
              heart={booksContent.heart}
              like={booksContent.like}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
