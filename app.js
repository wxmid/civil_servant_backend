var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose =  require("mongoose");

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var index = require('./routes/index');
var common = require('./routes/common');
var data = require('./routes/data');
var manage = require('./routes/manage');
// �������
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
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
var DB_CONN_STR  = "mongodb://localhost:27017/civilservant";
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
app.use('/', index);
app.use('/common', common);
app.use('/data', data);
app.use('/manage', manage);
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
