"use strict";
const dns = require('dns'),
    usage = require('./usage'),
    util = require('util'),
    argv = require('minimist')(process.argv.slice(2));

const timeout = parseInt(argv.t ,10) || 5000,
      isDebug = !!argv.d,
      dest = 'google.com';

let counter = 0,
    connected = true;

if(argv.h) {
  usage.print();
  return;
}

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

    // recursively check every {timeout} secs
    setTimeout(checkConnection, timeout);

    function log(connectionStatus) {

        let now = new Date();
        console.log((connectionStatus ? "[+] Connected\t\t" :"[!] No Connection\t") +
            util.format('%d:%d:%d', now.getHours(), now.getMinutes(), now.getSeconds())
            + "\t Loss counter: " + counter);
    }
  });
})();
