"use strict";
/* Add prototype changes */
Object.prototype.pad = function(width, z) { return pad(this.toString(), width, z) };

const dns = require('dns'),
    usage = require('./usage'),
    fs = require('fs'),
    util = require('util'),
    App = require('./app'),
    argv = require('minimist')(process.argv.slice(2));

const timeout = parseInt(argv.t ,10) || 5000,
      app = new App(),
      isDebug = !!argv.d,
      dest = 'google.com';

let counter = 0,
    connected = true;

handleOptions(argv);

(function checkConnection() {

  dns.lookup(dest, (err) => {

    if(err && err.code == "ENOTFOUND") {

      if(connected) counter++;

      log(false);

      connected = false;

    } else {

      if(isDebug) log(true);

      connected = true;
    }

    app.$apply(connected);

    // recursively check every {timeout} secs
    setTimeout(checkConnection, timeout);

    function log(connectionStatus) {
        console.log(generateLogLine(connectionStatus));
    }
  });
})();

function handleOptions(argv) {
  if(argv.h) {
    usage.print();
    process.exit();
  }

  if(argv.l) {
    app.use((status) => {
      fs.appendFile('log.txt', generateLogLine(status) + "\r\n");
    });
  }
}

function generateLogLine(connectionStatus) {

  let now = new Date();
  return (connectionStatus ? "[+] Connected\t\t" :"[!] No Connection\t") +
    util.format('%s:%s:%s', now.getHours().pad(2), now.getMinutes().pad(2), now.getSeconds().pad(2))
    + "\t Loss counter: " + counter;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
