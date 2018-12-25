/**
 * Created by wxm-pc on 2018/12/2.
 */
var express = require('express');
var url = require('url');
var router = express.Router();
var Edudata = require('../models/Edudata'); // ���ϡ�����
// ��ȡ��Դ�б�
router.post('/getdataList',function (req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    let reg = new RegExp(req.body.title, 'i') //�����ִ�Сд

    Edudata.count({title:{$regex: reg}},function (err, count) {
        Edudata.find({title:{$regex: reg}}).limit(Number(req.body.pageSize)).skip((Number(req.body.pageNo) - 1) * req.body.pageSize).sort({createdAt: -1}).exec(function (err,resf) {
            if (err) {
                result.status = 1
                result.desc = '����ʧ��'
                result.list = []
                return;
            } else {
                result.list = resf
                result.total = count
            }
            res.send(result)
        })
    })
})
module.exports = router;
