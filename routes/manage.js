/**
 * Created by wxm-pc on 2018/12/2.
 */
var express = require('express');
var router = express.Router();
var mongoose    = require('mongoose')
var Schema = mongoose.Schema;
// 得到数据库连接句柄
var db = mongoose.connection;
//骨架模版
var edudataSchema = new Schema({
    thumbnail: String,
    imgList: Array,
    title: String,
    price: Number,
    browseCount: Number,
    onOff: Boolean,
    description: String
})
//模型
var Edudata = mongoose.model('edudata', edudataSchema);
router.post('/addData', function(req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    //存储数据
    console.log(req.body)
    var edudata = new Edudata(req.body)
    //保存数据库
    edudata.save(function(err) {
        if (err) {
            result.status = 1
            result.desc = '保存失败'
            return;
        }
        res.send(result);
    });
});
//更新数据
router.post('/editData', function(req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    console.log(req.body)
    var conditions = {_id: req.body._id}
    var update = {$set:req.body}
    var options = {upsert : true};
    //更新数据库
    Edudata.updateOne(conditions, update, options,function(err,resf) {
        if (err) {
            result.status = 1
            result.desc = '更新失败'
            return;
        }
        res.send(result);
        // db.close();
    });
});
// 删除某条资源记录
router.get('/deleteData',function (req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    var conditions = {_id: req.body._id}
    Edudata.remove(conditions ,function (err,resf) {
        if (err) {
            result.status = 1
            result.desc = '删除失败'
            return;
        }
        res.send(result)
    })
})
// 获取资源列表
router.get('/getdataList',function (req, res, next) {
    let result = {
        status: 0,
        desc: 'success'
    }
    Edudata.find({},function (err,resf) {
        if (err) {
            result.status = 1
            result.desc = '保存失败'
            result.list = []
            return;
        } else {
            result.list = resf
            result.total = resf.length
        }
        res.send(result)
    })
})
module.exports = router;
