/**
 * Created by wxm-pc on 2018/12/2.
 */
var express = require('express');
var router = express.Router();
var mongoose    = require('mongoose')
var Schema = mongoose.Schema;
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
let result = {
    status: 0,
    desc: 'success'
}
//模型
var Edudata = mongoose.model('edudata', edudataSchema);
router.post('/addData', function(req, res, next) {
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
        console.log('meow');
    });
    res.send(result);
});
router.get('/getdataList',function (req, res, next) {
    Edudata.find({},function (err,resf) {
        if (err) {
            result.status = 1
            result.desc = '保存失败'
            result.list = []
            return;
        }
        result.list = resf
        result.total = resf.length
        res.send(result)
    })
})
module.exports = router;
