# ipfs.js

Wrapper for [node-ipfs-api](https://github.com/ipfs/node-ipfs-api)

## Browser friendly

Run `npm install ipfs-js`

Or reference `ipfs.min.js` inside a `<script />` to expose the global `ipfs`

## Example

### 1) Start IPFS

	export API_ORIGIN="http://localhost:8080"
	ipfs daemon

### 2) Upload example directory

`git clone https://github.com/ConsenSys/ipfs.js && cd ipfs.js`

For non-default ipfs configurations, you can run `./example.url` to `ipfs add -r example` and print the local gateway's url

### 3) Open IPFS gateway

Navigate to the url echoed from `./example.url` in the browser, or run `./example.url | xargs open` to open it on OSX

## Methods

#### `ipfs.setProvider({host: 'localhost', port: '5001'})`

* _localhost_ and _5001_ are the defaults when calling without arguments
* is also equivalent to `ipfs.setProvider({host: '/ip4/127.0.0.1/tcp/5001'})`


#### `ipfs.add(text, callback)`

	ipfs.add("Testing...", function(err, hash) {
		if (err) throw err; // If connection is closed
		console.log(hash); 	// "Qmc7CrwGJvRyCYZZU64aPawPj7CJ56vyBxdhxa38Dh1aKt"
	});


#### `ipfs.cat(hash, callback)`

	ipfs.cat("Qmc7CrwGJvRyCYZZU64aPawPj7CJ56vyBxdhxa38Dh1aKt", function(err, text) {
		if (err) throw err;
		console.log(text); 	// "Testing..."
	});
	
#### `ipfs.addJson(json, callback)`

#### `ipfs.catJson(hash, callback)`

#### `ipfs.api.*`  - all methods from node-ipfs-api

#### `ipfs.utils.base58ToHex(base58)`
#### `ipfs.utils.hexToBase58(hex)`

