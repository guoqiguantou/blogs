var http = require('http');
var express = require('express');
var app = express();

var mysql = require('mysql');

var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

app.use(bodyParser.json({ limit: '1mb' })); //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({ extended: true }));


let data = [],
    actions = [],
    promises = [];
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'test'
});

connection.connect();



function bb(result) {
    for (let item in result) {
        var action = () => { // 将每一次循环方法定义为一个方法变量
            return new Promise(resolve => { // 每个方法返回一个Promise对象，第一个参数为resolve方法
                connection.query('SELECT * FROM blogs  where cid=' + result[item].id, function (err, res) {
                    if (err) {
                        return;
                    }
                    resolve(
                        data.push({
                            ...result[item],
                            num: res.length
                        })
                    )
                });
            })
        }
        actions.push(action()); // 将每次循环调用的方法添加到方法数组中
    }
}

app.use((req, res, next) => {
    if (req.path !== '/' && !req.path.includes('.')) {
        res.header({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Headers': 'X-Requested-With',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8',
            "Access-Control-Allow-Headers": "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE"
        })
    }
    next()
})

app.get('/category2', function (req, res) {
    var sql = 'SELECT * FROM category';
    connection.query(sql, function (err, result) {
        if (err) {
            return;
        }

        function test() {
            promises = result.map((item) => new Promise(resolve => {
                connection.query('SELECT * FROM blogs  where cid=' + item.id, function (err, res) {
                    resolve(
                        data.push({
                            ...item,
                            num: res.length
                        })
                    )
                })
            }));

            Promise.all(promises).then(() => {
                res.end(
                    JSON.stringify({
                        msg: '查询成功',
                        code: 0,
                        flag: true,
                        data: data
                    })
                );
                data = []
            });

        }


        test()
        //console.log(data, 'data')
        // bb(result)
        // Promise.all(actions).then(() => { // 调用Promise的all方法，传入方法数组，结束后执行then方法参数中的方法
        //     console.log(actions, "All done!");
        //     res.end(
        //         JSON.stringify({
        //             msg: '查询成功',
        //             code: 0,
        //             flag: true,
        //             data: data
        //         })
        //     );
        // });
    })
})

app.get('/category', function (req, res) {
    var sql = 'SELECT category.id,category.text,category.desc,blogs.cid ,COUNT(blogs.cid) as num FROM  category LEFT JOIN blogs ON category.id = blogs.cid GROUP BY category.id';
    //var sql = 'SELECT category.id, category.text  FROM category,blogs WHERE category.id = blogs.cid'
    connection.query(sql, function (err, result) {
        if (err) {
            return;
        }
        //console.log(result)
        res.end(
            JSON.stringify({
                msg: '查询成功',
                code: 0,
                flag: true,
                data: result
            })
        );
    })
})

app.post('/bloglist', function (req, ress) {
    var sql = 'SELECT a.id, a.time,a.title,a.desc,a.content, b.text AS cname  FROM blogs a INNER JOIN category b ON a.cid = b.id;'

    connection.query(sql, function (err, result) {
        if (err) {
            return;
        }
        ress.end(
            JSON.stringify({
                msg: '查询成功',
                code: 0,
                flag: true,
                data: result
            })
        );

    })

})

app.get('/blogcontent', function (req, res) {

    var sql = 'SELECT a.id, a.time,a.title,a.desc,a.content, b.text FROM blogs a,category b WHERE a.cid = b.id AND a.id=' + req.query.id;
    connection.query(sql, function (err, result) {
        if (err) {
            return;
        }
        res.end(
            JSON.stringify({
                msg: '查询成功',
                code: 0,
                flag: true,
                data: result
            })
        );

    })

})

app.post('/blogdel', multipartMiddleware, function (req, res) {
    var sql = ' DELETE FROM blogs WHERE id=' + req.body.id;
    connection.query(sql, function (err, result) {
        if (err) {
            return;
        }
        res.end(
            JSON.stringify({
                msg: '删除成功',
                code: 0,
                flag: true,
            })
        );
    })

})

app.post('/search', multipartMiddleware, function (req, res) {
    let reqData = req.body;
    console.log(reqData)
    var sql = `SELECT * FROM blogs WHERE  title LIKE '%的%' OR cid=3`;
    connection.query(sql, function (err, result) {
        if (err) {
            return;
        }
        res.end(
            JSON.stringify({
                msg: '查询成功',
                code: 0,
                flag: true,
                data: result
            })
        );
    })

})
var server = app.listen(8888, function (request, response) {
    var host = server.address().address
    var port = server.address().port
})


// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');