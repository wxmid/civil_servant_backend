/**
 * Created by wxm-pc on 2018/1/3.
 */
var mongoose    = require('mongoose')
var Schema = mongoose.Schema;
// �õ����ݿ����Ӿ��
var db = mongoose.connection;
//�Ǽ�ģ��
var userSchema = new Schema({
    userName: { // �û���
        type: String,
        default: ''
    },
    openid: { // ���û�QQ��¼����վ��Ψһ��Ӧ�û���ݵı�ʶ
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
    }, // ͷ��
    status: {
        type: Number,
        default: 0
    }, // ע��״̬ 0��ͨע�ᣬ1��Ա����,2��Ա�ѹ��ڣ�3��Ա��ע��������ע����Υ����վ����ע����
    purchaseTime: { // ��Ա����ʱ��
        type: Date,
        default: null
    },
    deadline: { // ��Ա����ʱ��
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
//ģ��
var User = mongoose.model('user', userSchema);
module.exports = User;