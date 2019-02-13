var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var path = require('path');
var config = require('../config.js') // 配置文件
const util = require('util');
const fs = require('fs');
/* GET users listing. */
router.post('/uploadFile', function(req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    // 解析一个文件上传
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = config.uploadDir;
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和

    form.parse(req, function(err, fields, files) {
        if(err) {
            result.status = 1; // 错误
            result.desc = '上传出错'; // 错误
        } else {
            //同步重命名文件名
            // fs.renameSync(files.path,files.originalFilename);
            // res.writeHead(200, {'content-type': 'text/plain'});
            // res.write('received upload:\n\n');
            // res.end(util.inspect({fields: fields, files: files}));
            // result.src = path.join(__dirname, files.file[0].path)
            // result.src = "http://localhost:3000" +  path.join('/', files.file[0].path).replace(/\\/g,'/').replace(/public\//,'');
            result.src = "http://www.mindwen.com:3000" +  path.join('/', files.file[0].path).replace(/\\/g,'/').replace(/public\//,'');
            console.log(result)
            res.send(result);
        }
    });

});
// 操作session
router.get('/getSession', function(req, res, next) {
    const session = req.session;
    if (!session.num) {
        session.num = 0;
    }
    if (session.user) {
        let name = session.name;
        res.send(name + "第" + ++session.num + "次登录");
    } else {
        res.send("还没有登录");
    }
})
// 测试请求
router.get('/getdirect', function(req, res, next) {
    res.send({
        data: ["'aa'",'bb','cc']
    });
})
module.exports = router;
