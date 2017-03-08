const options = {
  't': 'Time in between requests in milliseconds',
  'd': 'Debug mode',
  'h': 'Show options'
};

module.exports = {
  options: options,
  print: printUsage
};

function printUsage() {
  console.log('OPTIONS');
  for(key in options) {
    console.log('\t-' + key + '\t' + options[key]);
  }
}
