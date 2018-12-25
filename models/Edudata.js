/**
 * Created by wxm-pc on 2018/12/25.
 */
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
//ģ��
var Edudata = mongoose.model('edudata', edudataSchema);
module.exports = Edudata;