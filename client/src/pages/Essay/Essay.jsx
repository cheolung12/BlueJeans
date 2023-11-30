import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import essay from '../../data/essay.json';
import EssayCard from '../../components/Essay/Main/EssayCard';
import ResButton from '../../components/common/ResButton';
import { useState } from 'react';
import axios from 'axios';
import Filter from '../../components/Ebook/Main/Filter';

// 백일장 임시데이터
// const essays = essay.essays;

export default function Essay() {
  const [essay, setEssay] = useState([
    { title: '' },
    { content: '' },
    { user_id: '' },
    { img_path: '' },
    { like: 0 },
    { created_at: '' },
    { updated_at: '' },
  ]);

  // get 요청
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/essays`,
        });
        console.log(response); // 받은 데이터를 상태에 업데이트
        setEssay(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
  }, []);

  // 카테고리 (인기순, 최신순, 전체보기)
  const handleFilter = async (type) => {
    let res;
    if (type === 'all') {
      try {
        res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/essay`,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      try {
        res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/essay/카태고리`,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (res) {
      console.log(res);
      setEssay(res.data);
    }
  };

  const handleLogin = () => {
    if (!window.localStorage.getItem('userID')) {
      alert('로그인해라');
    }
  };

  return (
    <div className='w-full flex justify-end'>
      <section className='flex flex-col items-end'>
        <div className='flex w-full'>
          <nav className='flex w-full justify-between items-center'>
            <Filter handleFilter={handleFilter} />
            {window.localStorage.getItem('userID') ? (
              <Link className='m-2' to={`/essay/create`} onClick={handleLogin}>
                <ResButton text='글 작성' />
              </Link>
            ) : (
              <Link className='m-2' to={`/login`} onClick={handleLogin}>
                <ResButton text='글 작성' />
              </Link>
            )}
          </nav>
        </div>

        <div className='flex justify-end w-full '>
          <div className='flex flex-wrap justify-between w-[58rem]'>
            {essay.map((e) => (
              <EssayCard
                key={e.id}
                id={e.id}
                title={e.title}
                content={e.content}
                thumbnail={e.img_path}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
