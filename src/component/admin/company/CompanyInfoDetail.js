import React from "react";
import {Delete, Edit} from "@mui/icons-material";
import axios from "axios";

const CompanyInfoDetail = ({company, key, setModal, modal, setEditData, editData}) => {

    const deleteCompany = (stock_code) => {
        axios.delete(process.env.REACT_APP_BACKEND_SERVER+'/admin/company-delete',{data: {delete_id:stock_code, user_id:JSON.parse(sessionStorage.getItem("user")).user_id}})
            .then((res) => {
                if (res.data.success === true) {
                    alert('성공적으로 삭제되었습니다. ')
                    window.location.reload();
                } else {
                    alert('삭제가 실패했습니다.')
                }
            })
    }

    const changeModal = () => {
        setEditData(company);
        setModal(!modal);
    }

    return(
        <tr className="text-sm" key={key}>
            <td>{company.stock_code}</td>
            <td>{company.company_name}</td>
            <td>{company.sector}</td>
            <td>{company.company_info}</td>
            <td><button onClick={changeModal} ><Edit/></button></td>
            <td><button onClick={() => deleteCompany(company.stock_code)}><Delete/></button></td>
        </tr>
    )
}

export default CompanyInfoDetail;