const db = require('../../db/config');

exports.test = (req, res) => {
    res.send('코딩중');
}

exports.login = (req, res, next) =>  {
    param = [req.body.user_id, req.body.password];
    console.log("data is : " + param);
    db.query('SELECT * FROM registered_user WHERE user_id=?', param[0],(err, rows) => {
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
}

exports.logout = (req, res) => {
    console.log('req 의 값은 : ', req.session);
    if(req.session.user) {
        req.session.destroy(error =>{
            if(error)
                console.log(error)
        });
    }
}
exports.loginCheck = (req, res) => {
    console.log("data :", req.body);
    db.query('SELECT * FROM registered_user WHERE user_id=?',req.body.user_id, (err, rows) => {
        if(err)
            console.log(err);
        if(rows.length > 0) {
            res.json({duplicated: false});
        } else {
            res.json({duplicated: true});
        }
    })
}
exports.nickNameCheck = (req, res) => {
    db.query('SELECT * FROM registered_user WHERE nickname=?',req.body.nickname, (err, rows) => {
        if(err)
            console.log(err);
        if(rows.length > 0) {
            res.json({duplicated: false});
        } else {
            res.json({duplicated: true});
        }
    })
}
