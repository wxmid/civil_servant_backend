/**
 * Created by wxm-pc on 2018/12/2.
 */
var express = require('express');
var router = express.Router();
var Schema = mongoose.Schema;
//�Ǽ�ģ��
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
//ģ��
var Movie = mongoose.model('edudatas', edudatasSchema);
//�洢����
var edudata = new Movie({
    title: '��������',
    doctor: 'ʷ��˹',
    year: 2018,
    flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
    country: '����',
    language: 'Ӣ��',
    summary: '��Ƭ'
})
//�������ݿ�
edudata.save(function(err) {
    if (err) {
        console.log('����ʧ��')
        return;
    }
    console.log('meow');
});
router.get('/addData', function(req, res, next) {
    res.send([{a:1,b:2},{a:1,b:2},{a:1,b:2},]);
});

module.exports = router;
