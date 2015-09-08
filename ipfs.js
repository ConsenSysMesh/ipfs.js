var ipfsApi;

try {
  ipfsApi  = require('ipfs-api/dist/ipfsapi.min.js');
} catch(e) {}

var base58   = require('bitcore/lib/encoding/base58.js');
var concat   = require('concat-stream');

var ipfs = {};

ipfs.currentProvider = {host: null, port: null};
ipfs.defaultProvider = {host: 'localhost', port: '5001'};
ipfs.api = null;

ipfs.setProvider = function(opts) {
  if (!opts) opts = this.defaultProvider;
  if (typeof opts === 'object' && !opts.hasOwnProperty('host')) {
    ipfs.api = opts;
    return;
  }

  ipfs.currentProvider = opts;
  ipfs.api = ipfsApi(opts.host, opts.port);
};

ipfs.utils = {};

ipfs.utils.base58ToHex = function(b58) {
  var hexBuf = base58.decode(b58);
  return hexBuf.toString('hex');
};

ipfs.utils.hexToBase58 = function(hexStr) {
  var buf = new Buffer(hexStr, 'hex');
  return base58.encode(buf);
};

ipfs.add = function(text, callback) {
  var textBuffer = new Buffer(text);

  ipfs.api.add(textBuffer, function (err, ret) {
    if (err) callback(err, null);
    else callback(null, ret[0] ? ret[0].Hash : ret.Hash);
  });
};

ipfs.cat = function(ipfsHash, callback) {
  ipfs.api.cat(ipfsHash, function(err, res) {
    if (err || !res) return callback(err, null);

    var gotIpfsData = function (ipfsData) {
      var ipfsText = ipfsData.toString();
      callback(err, ipfsText);
    };

    var concatStream = concat(gotIpfsData);

    if(res.readable) {
      // Returned as a stream
      res.pipe(concatStream);
    } else {
      // Returned as a string
      callback(err, res);
    }
  });
};

ipfs.addJson = function(jsonObject, callback) {
  var jsonString = JSON.stringify(jsonObject);
  ipfs.add(jsonString, callback);
};

ipfs.catJson = function(ipfsHash, callback) {
  ipfs.cat(ipfsHash, function (err, jsonString) {
    var jsonObject = typeof jsonString === 'string' ?  JSON.parse(jsonString) : jsonString;
    callback(err, jsonObject);
  });
};

module.exports = ipfs;
