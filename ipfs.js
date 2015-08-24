var ipfsApi = (typeof window !== 'undefined' && window.document) ? require('ipfs-api/ipfsapi.min.js') : require('ipfs-api');

var base58   = require('bitcore/lib/encoding/base58.js');
var concat   = require('concat-stream');

var ipfs = {};

ipfs.currentProvider = {host: null, port: null};
ipfs.defaultProvider = {host: 'localhost', port: '5001'};
ipfs.api = null;

ipfs.setProvider = function(opts) {
  if (!opts) opts = this.defaultProvider;
  ipfs.currentProvider = opts;
  ipfs.api = ipfsApi(opts.host, opts.port);
};

ipfs.utils = {};

ipfs.utils.hexToString = function(hexInput){
  var r = '';
  var h = hexInput;
  if (h.length >= 2 && h.slice(0, 2) === '0x') {
    h = h.slice(2);
  }
  
  for(var i = 0; i < h.length; i += 2) {
    if (h.substr(i, 2) !== '00') {
      r += h.substr(i, 2);
    }
  }

  return r;
};

ipfs.utils.stringToHex = function(string){
  var r = '';
  var i = 0;
  var h;
  
  while(i < string.length) {
    h = string.charCodeAt(i++).toString(16);
    while(h.length < 2){ h = h; }
    r += h;
  }
  
  return r;
};

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
    var gotIpfsData = function (ipfsData) {
      var ipfsText = ipfsData.toString();
      callback(err, ipfsText);
    };

    var concatStream = concat(gotIpfsData);

    if(err || !res) return console.error(err);

    if(res.readable) {
      // Returned as a stream
      res.pipe(concatStream);
    } else {
      // Returned as a string
      // TODO: Not sure what to do here...
      console.log(res);
    }
  });
};

ipfs.addJson = function(jsonObject, callback) {
  var jsonString = JSON.stringify(jsonObject);
  ipfs.add(jsonString, callback);
};

ipfs.catJson = function(ipfsHash, callback) {
  ipfs.cat(ipfsHash, function (err, jsonString) {
    var jsonObject = JSON.parse(jsonString);
    callback(err, jsonObject);
  });
};

module.exports = ipfs;
