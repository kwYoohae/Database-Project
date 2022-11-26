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