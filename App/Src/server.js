const express = require("express");
const router = require("../Routers/root.router");
const bodyParser = require("body-parser");
const moment = require('moment')
const cors = require("cors");
const schedule = require("node-schedule")
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

const app = express(); //để nó chuyển tất cả res req thành json để tiện thao tác
app.use(express.json());

//app.use(cors(corsOptions)) 


//app.use(cors(corsOptions))
// ========================== middleWare =================================

//
//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(router);

app.use(express.json()); //để nó chuyển tất cả res req thành json để tiện thao tác

app.use(express.urlencoded({ extended: true }));

// =========================================================================



// schedule.scheduleJob('3 * * * * *', () =>
// {
//   console.log("i ran")
// })

//const port = process.env.PORT || 3000;
// app.listen(port,{'Access-Control-Allow-Origin' : '*'}, () =>
// {
//   console.log(moment().format('LTS'))
//   console.log('Server running on port ' + port);
// })



app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});