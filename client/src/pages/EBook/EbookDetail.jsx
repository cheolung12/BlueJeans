import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Title from "../../components/Ebook/Main/Title";
import BookCardDetail from "../../components/Ebook/Detail/BookCardDetail";
import SideNavBar from "../../components/common/SideNavBar";
import axios from "axios";

export default function EBookDetail() {
  const { bookId } = useParams();

  // get요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
http://localhost:8080/api/ebook/detail/${bookId}`,

          method: "GET",
          url: `${process.env.REACT_APP_SERVER}/ebook/detail/${bookId}`,

        });
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // map 대신 find 사용
  // const findBook = books.find((book) => book.id === bookId);

  // <Link>에서 bookcard 데이터 받아옴
  const location = useLocation();
  // console.log(location.state);

  return (
    <div className='flex w-full justify-end'>
      <div>
        <Title />
        <div>
          <div>
            {/* 데이터 props로 넘겨줌 */}
            <BookCardDetail data={location.state.dataDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}
