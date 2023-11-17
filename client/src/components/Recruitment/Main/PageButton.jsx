import React, { useState } from 'react';
import Pagination from 'react-js-pagination';

export default function PageButton({ page, count, setPage }) {
    // const [page, setPage] = useState(1);

    // const handlePageChange = (page) => {
    //     setPage(page);
    // };

    return (
        <>
            {/* <button className="w-8 h-8 text-xs bg-blue-200 rounded-md">숫</button>*/}
            <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                prevPageText={'<'}
                nextPageText={'>'}
                onChange={setPage}
            />
        </>
    );
}
