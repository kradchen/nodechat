/**
 * Created by Administrator on 16-2-2.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if(req.cookies.loginFlag=='1') {
        res.render('chatwindow');
        return ;
    }
    res.redirect('/');
});

module.exports = router;