/**
 * Created by Administrator on 16-2-4.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var low = require('lowdb');
var storage = require('lowdb/file-sync');
var db = low('db.json', { storage });
function Communicate(dre) {
    var usernames = "330106196802020028;330106197112280062;330125197812250728;330125197311082551;330125197704200037;330106198412035215";
    var pwd="123456;123456;123456;123456;123456;654321";
    if (dre == 'in') {
        request.post("http://218.108.75.59:88/cl/login/",
            {form: {userNames: usernames, pwds:pwd}},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('STATUS: ' + response.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(response.headers));
                    console.log('BODY: ' + body);
                    db('ckMessages').remove();
                    db('ckMessages').push(JSON.parse(body));
                }
            }
        );
    }
    else if (dre == 'out') {
        request.post("http://218.108.75.59:88/cl/logout/",
            {form: {userNames: usernames, pwds:pwd}},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('STATUS: ' + response.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(response.headers));
                    console.log('BODY: ' + body);
                    db('ckMessages').remove();
                    db('ckMessages').push(JSON.parse(body));
                }
            }
        );
    }
    else {
        request.post("http://218.108.75.59:88/cl/testconn/trans/",
            {form: {"usermsgs": usermsgs}},
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('STATUS: ' + response.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(response.headers));
                    console.log('BODY: ' + body);
                    db('ckMessages').remove();
                    db('ckMessages').push(body);
                }
            }
        );
    }
}
router.get('/', function(req, res) {
    if(req.cookies.loginFlag=='1') {
        var i = new Date().getHours();
        var btnshow = i<17 && i>7;
        res.render('check',{btnFlag:btnshow});
        return ;
    }
    res.redirect('/');
});

router.post('/in/',function(req, res) {
    if(req.cookies.loginFlag=='1') {
        Communicate('in');
        res.json({StatusCode:200,ResultMessage:"申请已提交"});
    }
    else {
        res.redirect('/');
    }
});
router.post('/out/',function(req, res) {
    if(req.cookies.loginFlag=='1') {
        Communicate('in');
        res.json({StatusCode:200,ResultMessage:"申请已提交"});
    }
    else {
        res.redirect('/');
    }
});

router.get('/msg/',function(req,res){
    if(req.cookies.loginFlag=='1') {
        var tableCk = db('ckMessages');
        res.json(tableCk);
        tableCk.remove();
        return ;
    }
    res.redirect('/');
});
module.exports = router;