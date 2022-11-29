const pool = require('../../db/config');
const mysql = require('mysql');

const SQL_MONEY = 'select cash from registered_user where user_id=?;';
const SQL_STOCK_DAY = 'select date_format(market_date,\'%Y-%m-%d\') as \'market_date\',closing_price from share_price where share_code = ? order by market_date desc limit ?;';
const SQL_STOCK_DAY_FOR_NAME = 'select date_format(market_date,\'%Y-%m-%d\') as \'market_date\',closing_price from share_price, share_code where company_name = ? and share_code.share_code = share_price.share_code order by market_date limit ?;';
const SQL_BUY_OR_SELL = 'select date_format(trading_date,\'%Y-%m-%d\') as \'trading_date\', trading_history.share_code, share_price, share_amount, trading_type, company_name from trading_history, share_code where user_id = ? and trading_history.share_code = share_code.share_code order by trading_date asc;';
const SQL_FIND_STAR = 'SELECT * FROM favorite, share_code WHERE user_id = ? and company_name = ? and favorite.share_code = share_code.share_code;';
const SQL_HOLDING_STOCK = 'select (select market_date from share_price sp order by market_date desc limit 1) as last_date, hs.share_code, hs.share_amount * hs.share_average_price as prev_price, sp.closing_price*hs.share_amount as price, (sp.closing_price*hs.share_amount-hs.share_amount * hs.share_average_price) as profit, sc.company_name as stock_name from share_code as sc, holding_stock hs, share_price sp where hs.user_id=? and hs.share_code=sp.share_code and sp.share_code=sc.share_code and market_date=(select market_date from share_price sp order by market_date desc limit 1);';
const SQL_HOLDING_STOCK_MONEY = 'select sum(share_amount*share_average_price) as value from holding_stock where user_id=?;';
exports.pageIn = (req, res) => {

    pool.getConnection((err, conn) => {
        const sql_money = mysql.format(SQL_MONEY, req.body.user_id);
        const sql_stock_day = mysql.format(SQL_STOCK_DAY, [5930, 7]);
        const sql_buy_or_sell = mysql.format(SQL_BUY_OR_SELL, req.body.user_id);
        const sql_find_star = mysql.format(SQL_FIND_STAR, [req.body.user_id,req.body.search]);
        const sql_holding_stock = mysql.format(SQL_HOLDING_STOCK, req.body.user_id);
        const sql_holding_stock_money = mysql.format(SQL_HOLDING_STOCK_MONEY, req.body.user_id);
        console.log(req.body);
        conn.query(sql_money + sql_stock_day + sql_buy_or_sell + sql_find_star + sql_holding_stock + sql_holding_stock_money, (err, rows) => {
            let userCash = {};
            let sharePrice = [];
            let tradingHistory = [];
            let holdingStock = [];
            let holdingStockValue = {};
            let star = false;
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

            if (rows[3].length > 0) {
                if (rows[3][0].favorite === 1) {
                    star = true;
                } else {
                    star = false;
                }
            } else {
                star = false;
            }

            if (rows[4].length > 0) {
                for (let step = 0; step < rows[4].length; step++) {
                    let stock = {
                        code: rows[4][step].share_code,
                        value: rows[4][step].price,
                        profit: rows[4][step].profit,
                        stock_name: rows[4][step].stock_name
                    };
                    holdingStock.push(stock);
                }
            }

            if (rows[5].length > 0) {
                holdingStockValue = {value: rows[5][0].value};
            }

            let out = {
                userCash: userCash,
                sharePrice: sharePrice,
                tradingHistory: tradingHistory,
                holdingStock: holdingStock,
                holdingStockValue: holdingStockValue,
                star: star
            }

            console.log(out);
            res.json(out);
        })
        conn.release();
    })
}

exports.chart = (req, res) => {
    pool.getConnection((err, conn) => {
        const param = [req.body.name, parseInt(req.body.day)];
        const sql_chart = mysql.format(SQL_STOCK_DAY_FOR_NAME, param);

        const sql1 = 'SELECT * FROM holding_stock, share_code WHERE user_id = ? and company_name = ? and holding_stock.share_code = share_code.share_code;';
        const findFavorite = mysql.format(sql1, [req.body.user_id, req.body.name]);

        conn.query(sql_chart + findFavorite, (err, rows) => {
            let chartData = [];
            let isSuccess = false;
            let searchData = false;
            let isFavorite = false;
            if (err) {
                console.log(err);
                res.json({success: false, searchData: false});
            }

            if (rows[0].length > 0) {
                for (let i = 0; i < rows[0].length; i++) {
                    const data = {
                        name: rows[0][i].market_date,
                        주가: rows[0][i].closing_price,
                    }
                    chartData.push(data);
                }
                isSuccess = true;
                searchData = true;
            }

            if (rows[1].length > 0) {
                if (rows[1][0].favorite === 1) {
                    isFavorite = true;
                } else {
                    isFavorite = false;
                }
            }
            const responseData = {
                success: isSuccess,
                searchData: searchData,
                stock_name: req.body.name,
                chart_data: chartData,
                isFavorite: isFavorite
            };
            res.json(responseData);
        })
        conn.release();
    })
}

exports.addStar = (req, res) => {
    pool.getConnection((err, conn) => {
        const sql = 'INSERT INTO favorite(favorite, share_code, user_id) VALUES(1, (SELECT share_code FROM share_code WHERE company_name = ?), ?) ON DUPLICATE KEY UPDATE favorite = 1;';
        const updateStar = mysql.format(sql, [req.body.name, req.body.user_id]);
        conn.query(updateStar, (err, rows) => {
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

exports.subStar = (req, res) => {
    pool.getConnection((err, conn) => {
        const sql = 'UPDATE favorite, share_code SET favorite = 0 WHERE user_id = ? and company_name = ? and favorite.share_code = share_code.share_code;';
        const updateStar = mysql.format(sql, [req.body.user_id, req.body.name]);
        conn.query(updateStar, (err, rows) => {
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