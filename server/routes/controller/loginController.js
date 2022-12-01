const pool = require('../../db/config');
const mysql = require('mysql');
exports.test = (req, res) => {
    console.log(req.body);
}

exports.login = async (req, res, next) =>  {
    param = [req.body.user_id, req.body.password];
    console.log("data is : " + param);
    await pool.getConnection((err, conn) => {
        conn.query('SELECT * FROM registered_user WHERE user_id=? and pw=?', param,(err, rows) => {
            if(err)
                console.log(err);
            if(rows.length > 0) {
                let user = {
                    user_id: rows[0].user_id,
                    nickname: rows[0].nickname,
                    age: rows[0].age,
                    cash: rows[0].cash
                };
                res.json({success:true, user: user});
            } else {
                res.json({success:false});
            }
        })
        conn.release();
    })
}

exports.logout = async (req, res) => {
    console.log('req 의 값은 : ', req.session);
    if(req.session.user) {
        await req.session.destroy(error =>{
            if(error)
                console.log(error)
        });
    }
}

exports.loginCheck = async (req, res) => {
    console.log("data :", req.body);
    await pool.getConnection((err, conn) => {
        conn.query('SELECT * FROM registered_user WHERE user_id=?',req.body.user_id, (err, rows) => {
            if(err)
                console.log(err);
            if(rows.length > 0) {
                res.json({duplicated: false});
            } else {
                res.json({duplicated: true});
            }
        })
        conn.release();
    })
}
exports.nickNameCheck = async (req, res) => {
    await pool.getConnection((err, conn) => {
        conn.query('SELECT * FROM registered_user WHERE nickname=?',req.body.nickname, (err, rows) => {
            if(err)
                console.log(err);
            if(rows.length > 0) {
                res.json({duplicated: false});
            } else {
                res.json({duplicated: true});
            }
        })
        conn.release();
    })
}

exports.signUp = (req, res) => {
    pool.getConnection((err, conn) => {
        const sql1 = 'INSERT INTO registered_user(user_id, pw, nickname, age, created_at, cash) VALUES(?,?,?,?,now(),10000000);';
        const insertSignUp = mysql.format(sql1, [req.body.user_id, req.body.password, req.body.nickname, req.body.age]);
        conn.query(insertSignUp, (err, rows) =>{
            if (err) {
                console.log(err);
                res.json({success: false});
            } else {
                res.json({success: true});
            }
        })
        conn.release();
    })
}