const pool = require('../../db/config');
const mysql = require('mysql');

const SQL_PORTFOLIO = 'select sum(share_amount*share_average_price)+cash as value from registered_user r, holding_stock h where r.user_id = h.user_id and r.user_id=? group by r.user_id;';
const SQL_TODAY_STOCK = 'select sc.share_code, sc.company_name, sp.change_profit, sp.closing_price from share_price as sp, share_code as sc where sp.share_code in (select s.share_code from share_code s where s.share_code in (select * from ((select t.share_code from trading_history t group by t.share_code order by count(*) desc limit 5)) as tmp1)) and sp.share_code = sc.share_code and sp.market_date in (select * from ((select ssp.market_date from share_price as ssp order by ssp.market_date desc limit 1)) as tmp2);';
const SQL_RANKING = 'select user_id,sum(share_price*share_amount*case when trading_type=? then -1 when trading_type=? then 1 end) as profit from trading_history group by user_id order by profit desc limit 5;';
const SQL_HOLDING_STOCK = 'select (select market_date from share_price sp order by market_date desc limit 1) as last_date, hs.share_code, hs.share_amount * hs.share_average_price as prev_price, sp.closing_price*hs.share_amount as price, (sp.closing_price*hs.share_amount-hs.share_amount * hs.share_average_price) as profit, sc.company_name as stock_name from share_code as sc, holding_stock hs, share_price sp where hs.user_id=? and hs.share_code=sp.share_code and sp.share_code=sc.share_code and market_date=(select market_date from share_price sp order by market_date desc limit 1);';
const SQL_HOLDING_STOCK_MONEY = 'select sum(share_amount*share_average_price) as value from holding_stock where user_id=?;';
const SQL_NEWS = 'select news_date, news_title, news_url from news order by idx desc limit 5;';
const SQL_FAVORITE = 'SELECT DISTINCT f.share_code, s.company_name, change_profit, closing_price, MAX(market_date) as market_data FROM favorite as f, share_price as p, share_code as s WHERE user_id = ? and favorite = 1 and f.share_code = p.share_code and f.share_code = s.share_code group by share_code;';


exports.home = (req, res, next) => {
    pool.getConnection((err, conn) => {

        let sql_portfolio = mysql.format(SQL_PORTFOLIO, req.body.user_id);
        let sql_today_stock = SQL_TODAY_STOCK;
        let sql_ranking = mysql.format(SQL_RANKING, ['매수', '매도']);
        let sql_holding_stock = mysql.format(SQL_HOLDING_STOCK, req.body.user_id);
        let sql_holding_stock_money = mysql.format(SQL_HOLDING_STOCK_MONEY, req.body.user_id);
        let sql_news = SQL_NEWS;
        let sql_favorite = mysql.format(SQL_FAVORITE, req.body.user_id);

        conn.query(sql_portfolio + sql_today_stock + sql_ranking + sql_holding_stock + sql_holding_stock_money + sql_news
            + sql_favorite
            , (err, result) => {
                if (err) {
                    console.log(err);
                    res.send({message: "DB_HOME에서 예기치 않은 오류가 발생하였습니다."});
                    throw err;
                }
                let portfolioValue = {};
                let todayStock = [];
                let ranking = [];
                let holdingStock = [];
                let holdingStockValue = {};
                let news = [];
                let favorite = [];

                if (result[0].length > 0) {
                    portfolioValue = {value: result[0][0].value};
                }

                if (result[1].length > 0) {
                    for (var step = 0; step < result[1].length; step++) {
                        var stock = {
                            code: result[1][step].share_code,
                            name: result[1][step].company_name,
                            profit: result[1][step].change_profit,
                            price: result[1][step].closing_price
                        };
                        todayStock.push(stock);
                    }
                }

                if (result[2].length > 0) {
                    for (var step = 0; step < result[2].length; step++) {
                        var user = {
                            id: result[2][step].user_id,
                            profit: result[2][step].profit
                        };
                        ranking.push(user);
                    }
                }

                if (result[3].length > 0) {
                    for (var step = 0; step < result[3].length; step++) {
                        var stock = {
                            code: result[3][step].share_code,
                            value: result[3][step].price,
                            profit: result[3][step].profit,
                            stock_name: result[3][step].stock_name
                        };
                        holdingStock.push(stock);
                    }
                }

                if (result[4].length > 0) {
                    holdingStockValue = {value: result[4][0].value};
                }

                if (result[5].length > 0) {
                    for (var step = 0; step < result[5].length; step++) {
                        var row = {
                            date: result[5][step].news_date,
                            title: result[5][step].news_title,
                            url: result[5][step].news_url
                        };
                        news.push(row);
                    }
                }

                if (result[6].length > 0) {
                    for (let i = 0 ; i < result[6].length; i++) {
                        let row = {
                            share_code: result[6][i].share_code,
                            company_name: result[6][i].company_name,
                            profit: result[6][i].change_profit,
                            price: result[6][i].closing_price,
                            date: result[6][i].market_data
                        };
                        favorite.push(row);
                    }
                }
                const out = {
                    portfolioValue: portfolioValue,
                    todayStock: todayStock,
                    ranking: ranking,
                    holdingStock: holdingStock,
                    holdingStockValue: holdingStockValue,
                    news: news,
                    favorite:favorite
                }
                console.log(out);
                res.json(out);

            })
        conn.release();
    })
}
