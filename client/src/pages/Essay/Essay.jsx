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
  const [filtered, setFiltered] = useState([
    { title: '' },
    { content: '' },
    { user_id: '' },
    { img_path: '' },
    { like: 0 },
    { created_at: '' },
    { updated_at: '' },
    { nickname: '' },
  ]);

  const [searchInput, setSearchInput] = useState('');
  const [essayInits, setEssayInits] = useState([]);

  //정렬순
  // const [filtered, setFiltered] = useState([]);

  // get 요청
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER}/essays`,
        });
        // console.log(response); // 받은 데이터를 상태에 업데이트
        let essays = response.data;
        let latestEssays = [...essays].sort((a, b) =>
          b.created_at.localeCompare(a.created_at)
        );
        setFiltered(latestEssays);
        setEssayInits(latestEssays);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
  }, []);

  // 카테고리 (인기순, 최신순, 전체보기)
  const handleFilter = async (type) => {
    if (type === 'all') {
      try {
        setFiltered(essayInits);
      } catch (error) {
        console.error('정렬에러', error);
      }
    }
    if (type === 'latest') {
      try {
        let temp = [...filtered].sort((a, b) =>
          b.created_at.localeCompare(a.created_at)
        );
        setFiltered(temp);
        console.log(temp);
      } catch (error) {
        console.error('정렬에러', error);
      }
    }
    if (type === 'likes') {
      try {
        let popular = [...filtered].sort((a, b) => b.like - a.like);
        setFiltered(popular);
        console.log(popular);
      } catch (error) {
        console.error('정렬에러', error);
      }
    }

    // let res;
    // if (type === 'all') {
    //   try {
    //     res = await axios({
    //       method: 'GET',
    //       url: `${process.env.REACT_APP_SERVER}/essay`,
    //     });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // } else {
    //   try {
    //     res = await axios({
    //       method: 'GET',
    //       url: `${process.env.REACT_APP_SERVER}/essay/`,
    //     });
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // }
    // if (res) {
    //   console.log(res);
    //   setEssay(res.data);
    // }
  };

  const handleLogin = () => {
    if (!window.localStorage.getItem('userID')) {
      alert('로그인이 필요합니다.');
    }
  };

  // 검색제출
  const searchSubmit = async (e) => {
    e.preventDefault();

    // 제목, 작가 검색
    const searchEssays = essayInits.filter(
      (essay) => essay.title.includes(searchInput)
      // || essay.nickname.includes(searchInput)
    );
    setSearchInput('');
    setFiltered(searchEssays);
    console.log(searchEssays);

    // try {
    //   const response = await axios({
    //     method: 'GET',
    //     url: `${process.env.REACT_APP_SERVER}/essays?search=${searchInput}`,
    //     // url: `https://www.bluejeansu.site/ebook/search?keyword=${searchInput}`,
    //   });
    //   // setBooks(response.data);
    //   setFiltered(response.data);

    //   console.log('검색 결과', response.data);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  };

  return (
    <div className='w-full flex justify-end'>
      <section className='flex flex-col items-end'>
        <div className='flex w-full'>
          <nav className='flex w-full justify-between items-center'>
            <Filter handleFilter={handleFilter} />

            {/* 검색창 */}
            <div>
              <form onSubmit={searchSubmit} className='flex items-center'>
                <input
                  type='text'
                  placeholder='제목을 입력하세요'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className='rounded-full w-[25.5rem] h-[2.7rem] border-gray-300 outline-none pl-3 text-base border-2 focus:border-[#48599A]'
                />
                <button
                  disabled={searchInput.length === 0}
                  className='ml-[-2.5rem] mt-1 w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer'
                >
                  {/* 검색 아이콘 */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    {' '}
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M15.1991 6.74703C12.865 4.4131 9.08077 4.4131 6.74668 6.74703C4.41256 9.08098 4.41256 12.8651 6.74668 15.199C8.90131 17.3535 12.2917 17.5192 14.6364 15.696L17.9384 18.9978L18.999 17.9371L15.6969 14.6353C17.5194 12.2908 17.3535 8.90121 15.1991 6.74703ZM7.8073 7.80772C9.55561 6.05953 12.3902 6.05953 14.1385 7.80772C15.8868 9.55588 15.8868 12.3902 14.1385 14.1383C12.3902 15.8865 9.55561 15.8865 7.8073 14.1383C6.05902 12.3902 6.05902 9.55588 7.8073 7.80772Z'
                      fill='#222222'
                    />{' '}
                  </svg>
                </button>
              </form>
            </div>

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
            {filtered.map((e) => (
              <EssayCard
                key={e.id}
                id={e.id}
                title={e.title}
                content={e.content}
                thumbnail={e.img_path}
                like={e.like}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
