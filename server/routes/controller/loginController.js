const pool = require('../../db/config');

exports.test = (req, res) => {
    console.log(req.body);
}

exports.login = async (req, res, next) =>  {
    param = [req.body.user_id, req.body.password];
    console.log("data is : " + param);
    await pool.getConnection((err, conn) => {
        conn.query('SELECT * FROM registered_user WHERE user_id=?', param[0],(err, rows) => {
            if(err)
                console.log(err);
            if(rows.length > 0) {
                let user = {
                    user_id: rows[0].user_id,
                    nickname: rows[0].nickname,
                    age: rows[0].age,
                    cash: rows[0].cash
                };
                if(param[1] === rows[0].pw) {
                    res.json({message: 'success', user: user});
                } else {
                    res.json({message: 'fail', user: user});
                }
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
