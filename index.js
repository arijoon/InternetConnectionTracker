var dns = require('dns'),
    util = require('util'),
    argv = require('minimist')(process.argv.slice(2));

var timeout = parseInt(argv.t ,10) || 5000,
    dest = 'google.com';

var counter = 0,
    connected = true;

checkConnection();

function checkConnection() {
  dns.lookup(dest, function(err) {
    if(err && err.code == "ENOTFOUND") {

      if(connected) counter++;
      
      var now = new Date();
      console.log("[!] No Connection " + 
        util.format('%d:%d:%d', now.getHours(), now.getMinutes(), now.getSeconds())  
        + "\t Loss counter: " + counter)

      connected = false;

    } else {
      connected = true;
    }

    // recursively check every {timeout} secs
    setTimeout(checkConnection, timeout);
  });
}
