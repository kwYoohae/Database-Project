import React from 'react';

const ViewData = ({view, index}) => {
    return(
        <tr className="text-center" key={index}>
            <td>{view.company_name}</td>
            <td>{view.views}</td>
        </tr>
    )
}

export default ViewData;