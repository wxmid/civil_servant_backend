/**
 * Created by wxm-pc on 2018/12/2.
 */
var express = require('express');
var url = require('url');
var router = express.Router();
var mongoose    = require('mongoose')
var Schema = mongoose.Schema;
// �õ����ݿ����Ӿ��
var db = mongoose.connection;
//�Ǽ�ģ��
var edudataSchema = new Schema({
    thumbnail: String,
    imgList: Array,
    title: String,
    price: Number,
    browseCount: Number,
    onOff: Boolean,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})
//ģ��
var Edudata = mongoose.model('edudata', edudataSchema);
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
    Edudata.find({}).limit(req.query.pageSize).skip((req.query.pageSize - 1) * req.query.pageNo).exec(function (err,resf) {
        if (err) {
            result.status = 1
            result.desc = '����ʧ��'
            result.list = []
            return;
        } else {
            result.list = resf
            result.total = resf.length
        }
        /*res.writeHead(
         200,
         {'content-type': 'text/html'}
         )*/
        res.send(result)
    })
})
module.exports = router;
