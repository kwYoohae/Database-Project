import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

const SearchBar = ({setSearch, searchHandler, setView, serach}) => {

    const handlerSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleOnSearch = (e) => {
        console.log("여기로 들어옴");
        axios.post(process.env.REACT_APP_BACKEND_SERVER + '/search-data', {name: serach})
            .then((res)=>{
                setView(res.data.views);
            });
        searchHandler();
    }

    return(
        <div className="mt-10 shadow-2xl rounded-3xl border" style={{width:"614px", height:"71px"}}>
            <div className="mt-5 ml-5">
                <SearchIcon onClick={handleOnSearch} fontSize="large" className=""/>
                <input onChange={handlerSearch} placeholder="검색어를 입력해주세요." className="text-xl mx-2 w-72"/>
            </div>
        </div>
    )
}

export default SearchBar;