const express = require('express'), //express 框架 
      wechat  = require('./wechat/wechat'), 
       config = require('./config');//引入配置文件
       
var routes = require('./routes/index');


var app = express();//实例express框架

var wechatApp = new wechat(config); //实例wechat 模块

//用于处理所有进入 3080 端口 get 的连接请求
app.get('/',function(req,res){
    wechatApp.auth(req,res);
});

app.use("/",express.static(path.join(__dirname, 'views'),{index:false}));
app.get('/pages', routes);


//用于处理所有进入 3080 端口 post 的连接请求
app.post('/',function(req,res){
    wechatApp.handleMsg(req,res);
});

//用于请求获取 access_token
app.get('/getAccessToken',function(req,res){
    wechatApp.getAccessToken().then(function(data){
        res.send(data);
    });    
});

//监听3200端口
app.listen(3080);