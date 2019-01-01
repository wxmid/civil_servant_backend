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
    let class1 = req.body.class1
    let class2 = req.body.class2
    let class3 = req.body.class3
    let params = {title:{$regex: reg}};
    if(class1 != null) params.class1 = class1
    if(class2 != null) params.class2 = class2
    if(class3 != null) params.class3 = class3
    Edudata.count(params, function (err, count) {
        Edudata.find(params).limit(Number(req.body.pageSize)).skip((Number(req.body.pageNo) - 1) * req.body.pageSize).sort({createdAt: -1}).exec(function (err,resf) {
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
// ����id��ȡ��������
router.get('/getdataDetail',function (req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    Edudata.findOne({_id: req.query._id},function (err,resf) {
        if (err) {
            result.status = 1
            result.desc = '���翪С����...'
            return;
        } else {
            result.data = resf
        }
        res.send(result)
    })
})
module.exports = router;
