/**
 * Created by wxm-pc on 2018/12/25.
 */
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
    description: String,
    class1: Number,
    class2: Number,
    class3: Number,
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