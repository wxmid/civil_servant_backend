var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/getdatalist', function(req, res, next) {
  res.send([{a:1,b:2},{a:1,b:2},{a:1,b:2},]);
});

module.exports = router;
