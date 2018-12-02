/**
 * Created by wxm-pc on 2018/12/2.
 */
var express = require('express');
var router = express.Router();
var Schema = mongoose.Schema;
//骨架模版
var edudatasSchema = new Schema({
    thumbnail: String,
    imgList: Array,
    title: String,
    price: Number,
    browseCount: Number,
    year     : Number,
    summary  : String,
    poster   : String,
    flash    : String
})
//模型
var Movie = mongoose.model('edudatas', edudatasSchema);
//存储数据
var edudata = new Movie({
    title: '黑衣人三',
    doctor: '史密斯',
    year: 2018,
    flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
    country: '美国',
    language: '英语',
    summary: '好片'
})
//保存数据库
edudata.save(function(err) {
    if (err) {
        console.log('保存失败')
        return;
    }
    console.log('meow');
});
router.get('/addData', function(req, res, next) {
    res.send([{a:1,b:2},{a:1,b:2},{a:1,b:2},]);
});

module.exports = router;
