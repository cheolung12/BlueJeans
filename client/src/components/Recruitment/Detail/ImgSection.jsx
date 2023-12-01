import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ImgSection({ loading, data }) {
    return (
        <div>
            <div>이미지 섹션</div>
            {/* <div>=={dataD.id}번 일자리==</div>*/}
            {loading ? (
                <Skeleton className="w-full h-[450px] overflow-hidden border border-solid rounded-lg flex items-center justify-center" />
            ) : (
                <div className="w-full h-[450px] overflow-hidden border border-solid rounded-lg flex items-center justify-center">
                    <img className="w-full h-auto " src={data.img_path} alt="직업 소개 이미지" />
                </div>
            )}
        </div>
    );
}
