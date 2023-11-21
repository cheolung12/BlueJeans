import React from 'react';
import PageButtonSection from '../../components/Recruitment/Main/PageButtonSection';
import SelectRecruit from '../../components/Recruitment/Main/SelectRecruit';
import CardSection from '../../components/Recruitment/Main/CardSection';
import Paging from '../../components/Recruitment/Main/Paging';
import { Link } from 'react-router-dom';
import ResButton from '../../components/common/ResButton';

export default function Recruitment() {
  return (
    <>
      <section>
        {/* 인기순 & 최신순 셀렉트 */}
        <nav>
          <SelectRecruit />
        </nav>
        {/*
                <CardSection />
                */}
        {/* 메인 */}
        <Paging />
        <section></section>
        {/* 페이지 네이션 & 게시 버튼 */}
        <nav>
          <Link to={`/recruitment/create`}>
            <ResButton text='공고 게시' />
          </Link>
        </nav>
      </section>
    </>
  );
}
