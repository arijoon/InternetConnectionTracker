# Tracks Internet connection drops
This script tracks internet connection drops by running a dns lookup against `google.com`

## Usage

```
npm install
npm start
```

### Using custom interval
Default is 5 seconds. For 1 second interval between requests run following

```
node index.js -t 1000
```
#### Options
```
  -t      Time in between requests in milliseconds
  -d      Debug mode
  -h      Show options
```

### Basic output
```
[!] No Connection 19:42:9        Loss counter: 1
[!] No Connection 19:42:29       Loss counter: 2
[!] No Connection 19:42:34       Loss counter: 2
[!] No Connection 19:42:39       Loss counter: 2
```

 - Loss counter specifies how many times your connection has dropped
 - Each output line signals no connection at the time of request
 - No output is logged if you are connecetd to the internet
