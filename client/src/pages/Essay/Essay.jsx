import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import essay from '../../data/essay.json';
import EssayCard from '../../components/Essay/Main/EssayCard';
import ResButton from '../../components/common/ResButton';
import Pagination from 'react-js-pagination';
import { useState } from 'react';
import axios from 'axios';
import Filter from '../../components/Ebook/Main/Filter';

// 백일장 임시데이터
const essays = essay.essays;

export default function Essay() {
  const [essay, setEssay] = useState([]);

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

  console.log(essay);

  // 옵션별 정렬
  const [selectValue, setSelectValue] = useState('latest');

  const handleChange = async (e) => {
    const type = e.target.value;
    setSelectValue(type);
  };

  return (
    <div className='w-full flex justify-end'>
      <section className='flex flex-col items-end'>
        {/* 인기순 & 최신순 셀렉트 */}
        <div className='flex w-full'>
          <nav className='flex w-full justify-between items-center'>
            <Filter />

            <Link className='m-2' to={`/essay/create`}>
              <ResButton text='글 작성' />
            </Link>
            {/* <select
              className='m-2 px-4 py-2 border-2 rounded-md focus:border-chatColor'
              name=''
              id=''
              value={selectValue}
              onChange={handleChange}
            >
              <option value='latest'>최신순</option>
              <option value='favorite'>인기순</option>
            </select> */}
          </nav>
        </div>

        <div className='flex justify-end w-full '>
          <div className='flex flex-wrap justify-center w-[58rem]'>
            {essays.map((essayItem) => (
              <EssayCard
                key={essayItem.id}
                id={essayItem.id}
                title={essayItem.title}
                content={essayItem.content}
                thumbnail={essayItem.thumbnail}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
