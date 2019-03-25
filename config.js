/**
 * Created by wxm-pc on 2019/2/5.
 */
// 正式环境
/*const cfg = {
    accessAllow: 'http://www.mindwen.com',
    mongodbconn: 'mongodb://www.mindwen.com:27017/civilservant',
    uploadDir: "public/files/img/"
}*/
// 本地环境
const cfg = {
    accessAllow: 'http://192.168.56.1:8080',
    mongodbconn: 'mongodb://localhost:27017/civilservant',
    uploadDir: "../public/files/img/"
}
module.exports = cfg
