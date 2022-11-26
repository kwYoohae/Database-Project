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
        conn.release();
    })
}

exports.post = (req, res, next) => {
    pool.getConnection((err, conn) => {
        const get_board_sql = 'SELECT board_id, nickname, board.created_at, content, post_like, title, view, board_type FROM board, registered_user WHERE board_id = ? and registered_user.user_id = board.user_id;';
        const get_comment_sql = 'SELECT comment_id, comment.created_at, content, nickname FROM comment, registered_user WHERE board_id = ? and registered_user.user_id = comment.user_id;';
        let sql_board = mysql.format(get_board_sql, req.body.board_id);
        let sql_comment = mysql.format(get_comment_sql, req.body.board_id);
        conn.query(sql_board + sql_comment, (err, rows) => {
            let board = [];
            let comment = [];
            if (err) {
                res.json({success:false});
                console.log(err);
                throw err;
            }

            if (rows[0].length > 0) {
                for (let i = 0; i < rows[0].length; i++) {
                    let data = {
                        board_id: rows[0][i].board_id,
                        nickname: rows[0][i].nickname,
                        created_at: rows[0][i].created_at,
                        content: rows[0][i].content,
                        post_like: rows[0][i].post_like,
                        title: rows[0][i].title,
                        view: rows[0][i].view,
                        board_type: rows[0][i].board_type
                    }
                    board.push(data);
                }
            }

            if (rows[1].length > 0) {
                for (let i = 0; i < rows[1].length ; i++) {
                    let data = {
                        comment_id : rows[1][i].comment_id,
                        created_at : rows[1][i].created_at,
                        content: rows[1][i].content,
                        nickname: rows[1][i].nickname
                    }
                    comment.push(data);
                }
            }
            res.json({success:true, board: board, comment: comment});
        })
        conn.release();
    })
}

exports.view = (req, res) => {
    pool.getConnection((err, conn) => {
        const sql = 'UPDATE board SET view = view + 1 where board_id = ?;';
        let update_view = mysql.format(sql, req.params.board_id);
        conn.query(update_view, (err, result) => {
            if (err) {
                console.log(err);
                res.json({success:false});
            } else {
                res.json({success:true});
            }

            conn.release();
        })
    })
}

exports.comment = (req, res) => {
    pool.getConnection((err, conn) => {
        const sql = 'INSERT INTO comment(created_at, content, board_id, user_id)\n' +
            'VALUES (now(), ?, ?, ?);'
        const param = [req.body.comment, req.body.board_id, req.body.user_id];
        console.log(param);
        let insert_comment = mysql.format(sql, param);
        conn.query(insert_comment, (err, result) => {
            if (err) {
                console.log(err);
                res.json({success:false});
            } else {
                res.json({success:true});
            }

            conn.release();
        })
    })
}