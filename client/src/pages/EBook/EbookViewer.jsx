import React, { useState, useEffect } from 'react';
// import bookContents from '../../data/bookContents.json';
// import bookList from '../../data/bookList.json';
import BookViewer from '../../components/Ebook/Viewer/BookViewer';
import BookTitle from '../../components/Ebook/Viewer/BookTitle';
import ExitButton from '../../components/Ebook/Viewer/ExitButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EBookViewer() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState([]);

  // get요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          // url: `https://www.bluejeansu.site/ebook/detail/viewer/${bookId}`,
          url: `http://localhost:8080/api/ebook/detail/viewer/${bookId}`,
        });
        console.log(response);
        setBookData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [bookId]);

  return (
    <div>
      <div className='flex justify-end m-3'>
        <ExitButton />
      </div>
      <BookTitle />
      <BookViewer data={bookData} />
    </div>
  );
}
