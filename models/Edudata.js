/**
 * Created by wxm-pc on 2018/12/25.
 */
var mongoose    = require('mongoose')
var Schema = mongoose.Schema;
// 得到数据库连接句柄
var db = mongoose.connection;
//骨架模版
var edudataSchema = new Schema({
    thumbnail: {
        type: String,
        default: ''
    },
    imgList: {
        type: Array,
        default: []
    },
    title: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    browseCount: {
        type: Number,
        default: 0
    },
    onOff: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    }, // 云盘链接
    extCode: {
        type: String,
        default: ''
    }, // 提取码
    class1: {
        type: Number,
        default: null
    },
    class2: {
        type: Number,
        default: null
    },
    class3: {
        type: Number,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})
//模型
var Edudata = mongoose.model('edudata', edudataSchema);
module.exports = Edudata;