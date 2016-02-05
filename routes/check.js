/**
 * Created by Administrator on 16-2-4.
 */
var express = require('express');
var router = express.Router();
var http = require('https');
function Communicate(dre,pres)
{
    var options;
    var names = [
        {Name:"330106196802020028",Pwd:"123456"},
        {Name:"330106197112280062",Pwd:"123456"},
        {Name:"330125197812250728",Pwd:"123456"},
        {Name:"330125197311082551",Pwd:"123456"},
        {Name:"330125197704200037",Pwd:"123456"},
        {Name:"330106198412035215",Pwd:"654321"}];
    if(dre =='in8'){
        options =
        {
            hostname : '218.108.75.59',
            port : 80,
            method : 'POST',
            path : '/login/login/',
            header:{}
        };
    }
    if(dre =='out'){
        options =
        {
            hostname : '218.108.75.59',
            port : 80,
            method : 'POST',
            path : '/login/login/',
            header:{}
        };
    }
    else{
        options =
        {
            hostname : '218.108.75.59',
            port : 88,
            method : 'POST',
            path : '/cl/testconn/trans/'
        };
    }

    var req = http.request(options,function(res){
        console.log('STATUS: ' + res.statusCode);
        equal(200, res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));

        res.on('data',function (chunk) {
            console.log('BODY: ' + chunk);
        });
        res.on("end",function(res,pres){
            pres.json(res.body);
        });
    });

    var data = {tranStr:"hello world"};
    req.write(require('querystring').stringify(data));
    req.end();
}
router.get('/', function(req, res) {
    if(req.cookies.loginFlag=='1') {
        res.render('check');
        return ;
    }
    res.redirect('/');
});

router.post('/in/',function(req, res) {
    if(req.cookies.loginFlag=='1') {
        Communicate('in',res);
        return ;
    }
    res.redirect('/');
});
router.post('/out/',function(req, res) {
    if(req.cookies.loginFlag=='1') {
        var myArray=new Array({StatusCode:'888',ResultMessage:"Success out!"});
        res.json(myArray);
        return ;
    }
    res.redirect('/');
});

module.exports = router;