import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function EssayCreate() {
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="sm:text-4xl text-3xl font-bold mb-2 text-[#000000]">백일장 작성</div>
                <form
                    onSubmit={''}
                    className="w-full max-w-2xl h-full flex flex-col justify-center items-center border"
                    encType="multipart/form-data"
                >
                    <div className="w-full h-full flex flex-col justify-center">
                        <label htmlFor="title" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                            제목
                        </label>
                        <input
                            value={''}
                            onChange={''}
                            name="title"
                            type="text"
                            placeholder="제목을 입력하세요."
                            required
                            className="w-100 m-2 sm:h-12 h-9 p-2.5 sm:text-base text-xs block border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="" className="mx-3 mt-3 text-base text-gray-600 font-semibold">
                            내용
                        </label>
                        <textarea
                            rows="7"
                            className="m-2 w-100 p-2 sm:text-base text-xs resize-none border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-400"
                            value={''}
                            onChange={''}
                            name="content"
                            type="text"
                            placeholder="당신의 글 솜씨를 보여주세요!"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="my-3 w-[10rem] h-[3rem] inline-flex items-center justify-center px-2 py-2  text-white bg-gray-400 rounded-lg "
                        >
                            백일장에 게시하기
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
