var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//������ɵ��ַ���
var signStr = 'wuxiaoming123123'
var bodyParser = require('body-parser');
var mongoose =  require("mongoose");
var session = require("express-session")
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser()); // ��ǩ��cookie
app.use(cookieParser(signStr)); // ��ǩ��cookie
// session
app.use(session({
    secret: signStr,//�൱��һ��������Կ��ֵ�����������ַ���
    name: '_M_Session',
    cookie: {maxAge: 30*24*60*60*1000}, // 30��
    resave: false,//ǿ��session���浽session store��   ��ָÿ��������������session cookie
    saveUninitialized: false //ǿ��û�С���ʼ������session���浽storage��
}))
app.use(express.static(path.join(__dirname, 'public')));
// �������
app.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://192.168.56.1:8080");
    res.header("Access-Control-Allow-Origin", "http://www.mindwen.com");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    //��ν���Ϊ�˷��㷵��json����
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method == 'OPTIONS') {
        //��options������ٷ���
        res.sendStatus(200);
    } else {
        next();
    }
});
//====================***********�������ݿ�start**********=================
// ����mongodbģ�飬��ÿͻ��˶���
var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR  = "mongodb://localhost:27017/civilservant"; // ����
// var DB_CONN_STR  = "mongodb://101.132.164.38:27017/civilservant"; // ����IP
var DB_CONN_STR  = "mongodb://www.mindwen.com:27017/civilservant"; // ����
// ���庯�����ʽ�����ڲ������ݿⲢ���ؽ��
mongoose.connect(DB_CONN_STR,{useNewUrlParser:true},function (err) {
    if(err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connection success!')
    }
});
//====================***********�������ݿ�end**********=================
//====================***********�ӿ�ģ��start**********=================
app.use('/', require('./routes/index'));
app.use('/common', require('./routes/common'));
app.use('/data', require('./routes/data'));
app.use('/user', require('./routes/user'));
app.use('/manage', require('./routes/manage'));
//====================***********�ӿ�ģ��start**********=================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
