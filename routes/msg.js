/**
 * Created by Administrator on 16-2-2.
 */
var express = require('express');
var router = express.Router();
var low = require('lowdb');
var storage = require('lowdb/file-async');
var db = low('/db.json', { storage });
router.post('/', function(req, res) {
    var post;
    if (req.body.lastTime != undefined) {
        post = db('messages').find(function (m) {
            return m.sendTime > req.body.lastTime
        });
    }
    else{
        post = db('messages');
    }

    res.json(post);
});
router.post('/send/',function(req,res){
    var msg = {
        msgWriter:req.body.msgWriter,
        msgTime:new Date().toLocaleString(),
        msgDetail:req.body.msgDetail,
        msgReceiver:req.body.msgReceiver,
        msgFlag:0
    };
    db('messages').push(msg).then(rmsg=>res.json(rmsg));
});
module.exports = router;