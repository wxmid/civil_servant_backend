var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
const fs = require('fs');
/* GET users listing. */
router.post('/uploadFile', function(req, res, next) {
    // don't forget to delete all req.files when done
    //����multiparty���󣬲������ϴ�Ŀ��·��
    var form = new multiparty.Form({uploadDir: './upload/picture/'});

    //�ϴ���ɺ���
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
            //������Ϊ��ʵ�ļ���
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
                    res.end("{'status':200, 'message': '�ϴ�ʧ�ܣ�'}");
                } else {
                    console.log('rename ok');
                    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
                    res.end("{'status':400, 'message': '�ϴ��ɹ���'}");
                }
            });
        }
    });
});

module.exports = router;
