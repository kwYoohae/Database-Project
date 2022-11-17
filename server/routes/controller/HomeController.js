const db = require('../../db/config');

let portfolioValue = {}
let todayStock = []
let ranking = []
let holdingStock = []
let holdingStockValue = {}
let news = []

exports.home = (req, res, next) => {
    // 내 포트폴리오 가치
    db.query('select sum(share_amount*share_average_price)+cash as value from registered_user r, holding_stock h where r.user_id = h.user_id and r.user_id=? group by r.user_id',req.body.user_id, (err, rows) => {
        portfolioValue = {value : rows[0].value}
    })
    // 오늘의 주식
    db.query('select sc.share_code, sc.company_name, sp.change_profit, sp.closing_price from share_price as sp, share_code as sc where sp.share_code in (select s.share_code from share_code s where s.share_code in (select * from ((select t.share_code from trading_history t group by t.share_code order by count(*) desc limit 5)) as tmp1)) and sp.share_code = sc.share_code and sp.market_date in (select * from ((select ssp.market_date from share_price as ssp order by ssp.market_date desc limit 1)) as tmp2)', (err, rows) => {
        for (var step = 0; step < rows.length; step++) {
            var stock = {
                code : rows[step].share_code,
                name : rows[step].company_name,
                profit : rows[step].change_profit,
                price: rows[step].closing_price
            };
            todayStock.push(stock);
        }
    })
    // 랭킹
    db.query('select user_id,sum(share_price*share_amount*case when trading_type=? then -1 when trading_type=? then 1 end) as profit from trading_history group by user_id order by profit desc limit 5', ['매수', '매도'], (err, rows) => {
        for (var step = 0; step < rows.length; step++) {
            var user = {
                id : rows[step].user_id,
                profit : rows[step].profit
            };
            ranking.push(user);
        }
    })
    // 보유 주식
    db.query('select (select market_date from share_price sp order by market_date desc limit 1) as last_date, hs.share_code, hs.share_amount * hs.share_average_price as prev_price, sp.closing_price*hs.share_amount as price, (sp.closing_price*hs.share_amount-hs.share_amount * hs.share_average_price) as profit, sc.company_name as stock_name from share_code as sc, holding_stock hs, share_price sp where hs.user_id=? and hs.share_code=sp.share_code and sp.share_code=sc.share_code and market_date=(select market_date from share_price sp order by market_date desc limit 1)',req.body.user_id, (err, rows) => {
        for (var step = 0; step < rows.length; step++) {
            var stock = {
                code : rows[step].share_code,
                value : rows[step].price,
                profit : rows[step].profit,
                stock_name: rows[step].stock_name
            };
            holdingStock.push(stock);
        }
    })
    // 보유 주식 총액
    db.query('select sum(share_amount*share_average_price) as value from holding_stock where user_id=?',req.body.user_id, (err, rows) => {
        holdingStockValue = {value : rows[0].value}
    })
    // 뉴스 기사
    db.query('select news_date, news_title, news_url from news order by idx desc limit 5', (err, rows) => {
        for (var step = 0; step < rows.length; step++) {
            var row = {
                date : rows[step].news_date,
                title : rows[step].news_title,
                url : rows[step].news_url
            };
            news.push(row);
        }
    })
    var out = {
        portfolioValue : portfolioValue,
        todayStock : todayStock,
        ranking : ranking,
        holdingStock : holdingStock,
        holdingStockValue : holdingStockValue,
        news : news
    }
    console.log(out)
    res.json(out)

    portfolioValue = {}
    todayStock = []
    ranking = []
    holdingStock = []
    holdingStockValue = {}
    news = []
}
