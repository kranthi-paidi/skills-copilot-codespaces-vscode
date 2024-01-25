// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var comments = [{
    name: '张三',
    message: '今天天气不错',
    dateTime: '2015-10-16'
}, {
    name: '张三2',
    message: '今天天气不错2',
    dateTime: '2015-10-16'
}, {
    name: '张三3',
    message: '今天天气不错3',
    dateTime: '2015-10-16'
}, {
    name: '张三4',
    message: '今天天气不错4',
    dateTime: '2015-10-16'
}, {
    name: '张三5',
    message: '今天天气不错5',
    dateTime: '2015-10-16'
}];

http.createServer(function (req, res) {
    // 使用url.parse方法将路径解析为一个方便操作的对象，第二个参数为true表示直接将查询字符串转为一个对象
    var parseObj = url.parse(req.url, true);
    // 单独获取不包含查询字符串的路径部分（该路径不包含？之后的内容）
    var pathname = parseObj.pathname;
    if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            var htmlStr = template.render(data.toString(), {
                comments: comments
            });

            res.end(htmlStr);
        });
    } else if (pathname.indexOf('/public/') === 0) {
        // /public/css/main.css
        // /public/js/main.js
        // /public/lib/jquery.js
        // 统一处理：
        // 如果请求路径是以/public/开头的，则我认为你要获取public中的某个资源，所以我们就直接可以把请求路径当作文件路径来直接进行读取
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    }}).listen(3000, function () { 
        console.log('running...');
    });
