import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ImgSection({ loading, data }) {
    return (
        <div className="sm:p-0 p-2 ">
            {/* <div>=={dataD.id}번 일자리==</div>*/}
            {loading ? (
                <Skeleton className="w-full aspect-[1.5/1] overflow-hidden border border-solid rounded-lg flex items-center justify-center" />
            ) : (
                <div className="w-full aspect-[1.5/1] overflow-hidden border border-solid rounded-lg flex items-center justify-center">
                    <img className="w-full h-auto " src={data.img_path} alt="직업 소개 이미지" />
                </div>
            )}
        </div>
    );
}
