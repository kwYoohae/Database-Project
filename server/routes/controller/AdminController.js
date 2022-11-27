const pool = require('../../db/config');
const mysql = require('mysql');

exports.user = (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('SELECT * FROM registered_user;', (err, rows) => {
            if (err) {
                console.log(err);
                res.json({success:false});
            }
            console.log(rows);
            if (req.body.user_id !== 'admin') {
                res.json({success:false});
            }
            else if (rows.length > 0) {
                let user = [];
                for (let i = 0 ; i < rows.length; i++) {
                    const user_data = {
                        user_id: rows[i].user_id,
                        password: rows[i].pw,
                        nickname: rows[i].nickname,
                        age: rows[i].age,
                        created_at: rows[i].created_at,
                        cash: rows[i].cash
                    }
                    user.push(user_data);
                }
                res.json({success:true, user_data:user});
            }
            conn.release();
        })
    })
}

exports.deleteUser = (req, res) => {
    pool.getConnection((err, conn) => {
        if (req.body.user_id === 'admin') {
            const sql = 'DELETE FROM registered_user WHERE user_id = ?;';
            let delete_sql = mysql.format(sql, req.body.delete_id);
            conn.query(delete_sql, (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({success:false});
                }
                res.json({success:true});
            })
        } else {
            res.json({success:false});
        }
        conn.release();
    })

}

exports.updateUser = (req, res) => {
    pool.getConnection((err, conn) => {
        if (req.body.user_id === 'admin') {
            const sql = 'UPDATE registered_user SET pw=?, nickname=?, age=?, cash=? WHERE user_id = ?;';
            const param = [req.body.password, req.body.nickname, req.body.age, req.body.cash, req.body.change_id];
            const update_sql = mysql.format(sql, param);
            conn.query(update_sql, (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({success:false});
                }
                res.json({success:true});
            })
        } else {
            res.json({success:false});
        }
        conn.release();
    })
}

exports.company = (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('SELECT * FROM share_code, company_info WHERE share_code.share_code = company_info.share_code;', (err, rows) => {
            if (err) {
                console.log(err);
                res.json({success:false});
            }
            console.log(rows);
            if (req.body.user_id !== 'admin') {
                res.json({success:false});
            }
            else if (rows.length > 0) {
                let company = [];
                for (let i = 0 ; i < rows.length; i++) {
                    const companyData = {
                        stock_code: rows[i].share_code,
                        company_name: rows[i].company_name,
                        sector: rows[i].sector,
                        company_info: rows[i].company_introduction
                    }
                    company.push(companyData);
                }
                res.json({success:true, company:company});
            }
            conn.release();
        })
    })
}

exports.deleteCompany = (req, res) => {
    pool.getConnection((err, conn) => {
        if (req.body.user_id === 'admin') {
            const sql1 ='DELETE FROM company_info WHERE share_code = ?;';
            let delete_sql1 = mysql.format(sql1, req.body.delete_id);
            const sql2 = 'DELETE FROM share_code WHERE share_code = ?;';
            let delete_sql2 = mysql.format(sql2, req.body.delete_id);
            conn.query(delete_sql1 + delete_sql2, (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({success:false});
                }
                res.json({success:true});
            })
        } else {
            res.json({success:false});
        }
        conn.release();
    })

}

exports.updateCompany = (req, res) => {
    pool.getConnection((err, conn) => {
        if (req.body.user_id === 'admin') {
            const sql1 = 'UPDATE share_code SET company_name=?, sector=? WHERE share_code = ?;';
            const param1 = [req.body.name, req.body.sector ,req.body.stock_code];
            const sql2 = 'UPDATE company_info SET company_introduction = ? WHERE share_code =?;';
            const param2 = [req.body.info, req.body.stock_code];
            const update_sql1 = mysql.format(sql1, param1);
            const update_sql2 = mysql.format(sql2, param2);
            conn.query(update_sql1 + update_sql2, (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({success:false});
                }
                res.json({success:true});
            })
        } else {
            res.json({success:false});
        }
        conn.release();
    })
}

exports.insert = (req, res) => {
    pool.getConnection((err, conn) => {
        if (req.body.user_id === 'admin') {
            const sql1 = 'INSERT INTO share_code(share_code, company_name, sector) VALUES (?,?,?);';
            const param1 = [req.body.stock_code, req.body.company_name, req.body.sector];
            const sql2 = 'INSERT INTO company_info(share_code,listed_shares,company_introduction) VALUES (?,0,?);';
            const param2 = [req.body.stock_code, req.body.company_info];
            const insert_sql1 = mysql.format(sql1, param1);
            const insert_sql2 = mysql.format(sql2, param2);
            console.log(req.body);
            conn.query(insert_sql1 + insert_sql2, (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json({success:false});
                }
                res.json({success:true});
            })
        } else {
            res.json({success:false});
        }
        conn.release();
    })
}