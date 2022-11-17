import React from "react";

const NewsData = ({news}) => {
    return(
        <tr>
            <td>{news.date.substring(0,10)}</td>
            <td>
                <a href={news.url}>{news.title}</a>
            </td>
        </tr>
    );
}

export default NewsData;