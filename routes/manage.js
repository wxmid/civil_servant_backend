/**
 * Created by wxm-pc on 2018/12/2.
 */
var express = require('express');
var url = require('url');
var router = express.Router();
var Edudata = require('../models/Edudata'); //���� ���롣����
router.post('/addData', function(req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    //�洢����
    console.log(req.body)
    var edudata = new Edudata(req.body)
    //�������ݿ�
    edudata.save(function(err) {
        if (err) {
            result.status = 1
            result.desc = '����ʧ��'
            return;
        }
        res.send(result);
    });
});
//��������
router.post('/editData', function(req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    console.log(req.body)
    var conditions = {_id: req.body._id}
    var update = {$set:req.body}
    update.updatedAt = Date.now()
    var options = {upsert : true};
    //�������ݿ�
    Edudata.updateOne(conditions, update, options,function(err,resf) {
        if (err) {
            result.status = 1
            result.desc = '����ʧ��'
            return;
        }
        res.send(result);
        // db.close();
    });
});
// ɾ��ĳ����Դ��¼
router.delete('/deleteData',function (req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    var conditions = {"_id": req.query._id}
    Edudata.remove(conditions ,function (err,resf) {
        if (err) {
            result.status = 1
            result.desc = 'ɾ��ʧ��'
            return;
        }
        res.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
        res.end(JSON.stringify(result))
    })
})
// ��ȡ��Դ�б�
router.get('/getdataList',function (req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    let reg = new RegExp(req.query.title, 'i') //�����ִ�Сд
    Edudata.countDocuments({title:{$regex: reg}},function (err, count) {
        Edudata.find({title:{$regex: reg}}).limit(Number(req.query.pageSize)).skip((Number(req.query.pageNo) - 1) * req.query.pageSize).sort({createdAt: -1}).exec(function (err,resf) {
            if (err) {
                result.status = 1
                result.desc = '����ʧ��'
                result.list = []
                return;
            } else {
                result.list = resf
                result.total = count
            }
            /*res.writeHead(
             200,
             {'content-type': 'text/html'}
             )*/
            res.send(result)
        })
    })
})
module.exports = router;
