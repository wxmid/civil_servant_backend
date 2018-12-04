var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
const fs = require('fs');
/* GET users listing. */
router.post('/uploadFile', function(req, res, next) {
    // don't forget to delete all req.files when done
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './upload/picture/'});

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
            var dstPath = './upload/picture/' + inputFile.originalFilename;
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
    });
});

module.exports = router;
