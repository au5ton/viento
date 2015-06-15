//For website development purposes only
/*To use:

npm install
node server.js

*/

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080);
console.log("Serving files in this directory at:\nhttp://localhost:8080\nPress CTRL+C to stop.");