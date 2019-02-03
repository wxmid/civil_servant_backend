var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var path = require('path');

const util = require('util');
const fs = require('fs');
/* GET users listing. */
router.post('/uploadFile', function(req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    /*// don't forget to delete all req.files when done
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/files/img/'});

    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var obj ={};

        var filesTmp = JSON.stringify(files,null,2);
        if(err){
            console.log('parse error: ' + err);
        }
        else {

            console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/files/img/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
                    res.end("{'status':200, 'message': '上传失败！'}");
                } else {
                    console.log('rename ok');
                    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
                    res.end("{'status':400, 'message': '上传成功！'}");
                }
            });
        }
    });*/
    // 解析一个文件上传
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "../public/files/img/";
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
            result.src = "http://localhost:3000" +  path.join('/', files.file[0].path).replace(/\\/g,'/').replace(/public\//,'');
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
