const pool = require('../../db/config');
const mysql = require('mysql');

const SQL_MONEY = 'select cash from registered_user where user_id=?;';
const SQL_STOCK_DAY = 'select date_format(market_date,\'%Y-%m-%d\') as \'market_date\',closing_price from share_price where share_code = ? order by market_date desc limit ?;';
const SQL_BUY_OR_SELL = 'select date_format(trading_date,\'%Y-%m-%d\') as \'trading_date\', trading_history.share_code, share_price, share_amount, trading_type, company_name from trading_history, share_code where user_id = ? and trading_history.share_code = share_code.share_code order by trading_date asc;';
exports.pageIn = (req, res) => {

    pool.getConnection((err, conn) => {
        const sql_money = mysql.format(SQL_MONEY, req.body.user_id);
        const sql_stock_day = mysql.format(SQL_STOCK_DAY, [5930, 7]);
        const sql_buy_or_sell = mysql.format(SQL_BUY_OR_SELL, req.body.user_id);

        conn.query(sql_money + sql_stock_day + sql_buy_or_sell, (err, rows) => {
            let userCash = {};
            let sharePrice = [];
            let tradingHistory = [];
            if (rows[0].length > 0) {
                userCash = {cash: rows[0][0]};
            }

            if (rows[1].length > 0) {
                for (var step = 1; step <= rows[1].length; step++) {
                    var share = {
                        date: rows[1][rows[1].length - step].market_date,
                        share_price: rows[1][rows[1].length - step].closing_price,
                    };
                    sharePrice.push(share);
                }
            }

            if (rows[2].length > 0) {
                for (let i = 0; i < rows[2].length; i++) {
                    let history = {
                        date: rows[2][i].trading_date,
                        share_code: rows[2][i].share_code,
                        company_name: rows[2][i].company_name,
                        share_price: rows[2][i].share_price,
                        share_amount: rows[2][i].share_amount,
                        trading_type: rows[2][i].trading_type
                    };
                    tradingHistory.push(history);
                }
            }

            let out = {
                userCash: userCash,
                sharePrice: sharePrice,
                tradingHistory: tradingHistory
            }

            console.log(out);
            res.json(out);
        })
        conn.release();
    })
}