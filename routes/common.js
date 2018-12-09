var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var path = require('path');

const util = require('util');
const fs = require('fs');
/* GET users listing. */
let result = {
    status: 0,
    desc: 'success'
}
router.post('/uploadFile', function(req, res, next) {
    /*// don't forget to delete all req.files when done
    //����multiparty���󣬲������ϴ�Ŀ��·��
    var form = new multiparty.Form({uploadDir: './public/files/img/'});

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
            var dstPath = './public/files/img/' + inputFile.originalFilename;
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
    });*/
    // ����һ���ļ��ϴ�
    var form = new multiparty.Form();
    //���ñ༭
    form.encoding = 'utf-8';
    //�����ļ��洢·��
    form.uploadDir = "../public/files/img/";
    //���õ��ļ���С����
    form.maxFilesSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  ���������ļ��Ĵ�С�ܺ�

    form.parse(req, function(err, fields, files) {
        if(err) {
            result.status = 1; // ����
            result.desc = '�ϴ�����'; // ����
        } else {
            //ͬ���������ļ���
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

module.exports = router;
