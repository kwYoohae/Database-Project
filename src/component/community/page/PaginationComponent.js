import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

const PaginationComponent = ({ totalCount, postPerPage, pageRangeDisplayed, handlePageChange, page}) => {

    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={postPerPage}
            totalItemsCount={totalCount ? totalCount : 0}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={handlePageChange}
            prevPageText={"<"}
            nextPageText={">"}
        />
    );
};
export default PaginationComponent;
