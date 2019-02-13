/**
 * Created by wxm-pc on 2018/1/3.
 */
var mongoose    = require('mongoose')
var Schema = mongoose.Schema;
// 得到数据库连接句柄
var db = mongoose.connection;
//骨架模版
var userSchema = new Schema({
    userName: { // 用户名
        type: String,
        default: ''
    },
    openid: { // 是用户QQ登录此网站上唯一对应用户身份的标识
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: '123456'
    },
    avatar: {
        type: String,
        default: '',
    }, // 头像
    status: {
        type: Number,
        default: 0
    }, // 注册状态 0普通注册，1会员期内,2会员已过期，3会员已注销（主动注销或违反网站规则被注销）
    purchaseTime: { // 会员购买时间
        type: Date,
        default: null
    },
    deadline: { // 会员过期时间
        type: Date,
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
var User = mongoose.model('user', userSchema);
module.exports = User;