const pool = require('../../db/config');
const mysql = require('mysql');

exports.wholePost = (req, res, next) => {
    pool.getConnection((err, conn) => {
        conn.query('SELECT nickname, board_id, content, title, view, board_type, post_like FROM board, registered_user where board.user_id = registered_user.user_id', (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }

            if (result.length > 0) {
                let data = [];
                for (let i = 0; i < result.length; i++) {
                    let stock = {
                        board_id: result[i].board_id,
                        nickname: result[i].nickname,
                        title: result[i].title,
                        content: result[i].content,
                        view: result[i].view,
                        post_like: result[i].post_like,
                        board_type: result[i].board_type
                    }
                    data.push(stock);
                }
                res.json(data);
            }
            conn.release();
        })
    })
}

exports.write = (req, res, next) => {
    pool.getConnection((err, conn) => {
        const query = 'INSERT INTO board(user_id, created_at, modified_at, content, post_like, title, view, board_type)\n' +
            'VALUES ( ? , now(), now(), ? , 0, ? , 0, ?);';
        const params = [req.body.user_id, req.body.content, req.body.title, req.body.board_type];
        let sqls = mysql.format(query, params);
        conn.query(sqls, (err, result) => {
            if (err) {
                res.json({success:false});
                console.log(err);
                throw err;
            }
            return res.json({success:true});
        })
    })
}