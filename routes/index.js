var express = require('express');
var router = express.Router();
var Users =[{UserID:"admin",Pwd:"ywjyk123456"}];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/', function(req, res, next) {
  for(var i=0;i<Users.length;i++) {
    if(Users[i].UserID == req.body.UserID && Users[i].Pwd == req.body.Pwd) {
      res.cookie('loginFlag', '1', {expires: new Date(Date.now() + 900000), httpOnly: true});
      res.redirect('/check/');
      return;
    }
  }
  res.render('login');
});
module.exports = router;
