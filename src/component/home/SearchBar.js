import React from "react";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return(
        <div className="shadow-2xl rounded-3xl border" style={{width:"614px", height:"71px"}}>
            <div className="mt-5 ml-5">
                <SearchIcon fontSize="large" className=""/>
                <input placeholder="검색어를 입력해주세요." className="text-xl mx-2 w-72"/>
            </div>
        </div>
    )
}

export default SearchBar;