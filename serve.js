var http = require('http');
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");
var multer = require('multer');
app.use(bodyParser.json({ limit: '1mb' })); //这里指定参数使用 json 格式
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: '/tmp/' }).any());
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
    var sql = 'SELECT category.id,category.text,category.desce,blogs.cid ,COUNT(blogs.cid) as num FROM  category LEFT JOIN blogs ON category.id = blogs.cid GROUP BY category.id';
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

app.post('/bloglist', function (req, res) {
    var sql = 'SELECT a.id, a.time,a.title,a.desce,a.content,a.cid,a.blumb, b.text AS cname  FROM blogs a INNER JOIN category b ON a.cid = b.id ORDER BY a.time DESC;'
    if (req.body.title && req.body.cid) {
        sql = `SELECT a.id, a.time,a.title,a.desce,a.content,a.cid,a.blumb, b.text AS cname  FROM blogs a INNER JOIN category b ON a.cid = b.id WHERE  title LIKE '%${req.body.title}%' OR cid=${req.body.cid}`
    } else if (req.body.title) {
        sql = `SELECT a.id, a.time,a.title,a.desce,a.content,a.cid,a.blumb, b.text AS cname  FROM blogs a INNER JOIN category b ON a.cid = b.id WHERE  title LIKE '%${req.body.title}%'`
    } else if (req.body.cid) {
        sql = `SELECT a.id, a.time,a.title,a.desce,a.content,a.cid,a.blumb, b.text AS cname  FROM blogs a INNER JOIN category b ON a.cid = b.id WHERE cid=${req.body.cid}`
    }
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

app.get('/blogcontent', function (req, res) {

    var sql = 'SELECT a.id, a.time,a.title,a.desce,a.content, b.text FROM blogs a,category b WHERE a.cid = b.id AND a.id=' + req.query.id;
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


app.post('/file_upload', function (req, res) {
    var des_file = __dirname + "/public/image/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.readdir(__dirname + "/public/image/", function (err, dirdata) {
            if (err) {
                fs.mkdir(__dirname + "/public/image/", function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    fs.writeFile(des_file, data, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            response = {
                                message: 'File uploaded successfully',
                                filename: __dirname + "/public/image/" + req.files[0].originalname
                            };
                        }
                        res.end(JSON.stringify(response));
                    });

                });
            } else {
                fs.writeFile(des_file, data, function (err) {
                    if (err) {
                        return
                    } else {
                        response = {
                            message: 'File uploaded successfully',
                            filename: __dirname + "/public/image/" + req.files[0].originalname
                        };
                    }
                    res.end(JSON.stringify(response));
                });
            }
        })
    });


})

app.post('/blogadd', function (req, res) {
    var addSql = 'INSERT INTO blogs(id,title,desce,content,cid,blumb) VALUES(0,?,?,?,?,?)';
    let addSqlParams = [];
    let reqData = req.body;
    addSqlParams.push(reqData.title)
    addSqlParams.push(reqData.desc)
    addSqlParams.push(reqData.content)
    addSqlParams.push(reqData.cid)
    addSqlParams.push(reqData.blumb)
    console.log(addSqlParams)
    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            return;
        }
        // console.log(res)
        res.end(
            JSON.stringify({
                msg: '添加成功',
                code: 0,
                flag: true,
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