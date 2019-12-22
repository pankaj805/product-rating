require("@babel/register");
require("@babel/polyfill");
var app = require('./app.js');

app.listen(3005,()=>{
    console.log(' ********** : running on 3005');
})