'use strict';

var fs =require('fs');    //for image upload file handling

var express = require('express');
var app = express();
var Pusher = require('pusher');

var pusherConfig = {};
try {
  pusherConfig = require('./pusherConfig');
} catch (err) {
  pusherConfig.appId = process.env.PUSHER_APP_ID;
  pusherConfig.key = process.env.PUSHER_KEY;
  pusherConfig.secret = process.env.PUSHER_SECRET;
}

var pusher = new Pusher(pusherConfig);

var port = Number(process.env.PORT || 3000);
var host = 'localhost';
var serverPath = '/';
var staticPath = '/';

var staticFilePath = __dirname + serverPath;
// remove trailing slash if present
if(staticFilePath.substr(-1) === '/'){
  staticFilePath = staticFilePath.substr(0, staticFilePath.length - 1);
}

app.configure(function(){
  // compress static content
  app.use(express.compress());
  app.use(serverPath, express.static(staticFilePath));    //serve static files
  
  app.use(express.bodyParser());    //for post content / files - not sure if this is actually necessary?
});

var items = [
      { id: 0, name: 'Item 1', qty: 1 },
      { id: 1, name: 'Item 2', qty: 1 },
      { id: 2, name: 'Item 3', qty: 1 },
      { id: 3, name: 'Item 4', qty: 1 },
      { id: 4, name: 'Item 5', qty: 1 },
      { id: 5, name: 'Item 6', qty: 1 }
    ];

app.get('/api/items', function (req, res) {
  console.log('getting items');
  res.json(items);
});

app.post('/api/items', function (req, res) {
  console.log('updating item');
  var item = req.body;
  items[item.id] = item;

  pusher.trigger('items', 'updated', item);
  pusher.trigger('activities', 'new', {timestamp: new Date(), message: item.name + ' updated.'});
  res.json(item);
});

//catch all route to serve index.html (main frontend app)
app.get('*', function(req, res){
  res.sendfile(staticFilePath + staticPath+ 'index.html');
});


app.listen(port);

console.log('Server running at http://'+host+':'+port.toString()+'/');