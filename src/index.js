const app = require('./server');


app.listen(app.get("port"),()=>{
console.log("Server Listen on Port", app.get("port"), "http://localhost:4000/");
});