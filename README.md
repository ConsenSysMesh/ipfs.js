# ipfs.js

Wrapper for [node-ipfs-api](https://github.com/ipfs/node-ipfs-api)

## Browser friendly

Referencing `ipfs.min.js` inside `<script></script>` tags will expose the global `ipfs`

## Example

### 1) Start IPFS
	export API_ORIGIN="http://localhost:8080"
	ipfs daemon

### 2) Upload example directory
	git clone https://github.com/ConsenSys/ipfs.js && cd ipfs.js
	ipfs add -r example
	> added QmeJzfiqxDpvYcGmNnfJFw4M6WPdfpEfs6bu7hDCLgVq2a example/index.html
	> added Qmd2NxNnbEFVzrSUYLzTim7pa4JVcfKUff8ChBfeSYAYkk example/ipfs.min.js
	> added QmT7g6zhXE5qUQEgZ5fgjPfK9HKZosatSiBVG4h6wN2JUc example

### 3) Open IPFS gateway
Navigate to `http://localhost:8080/ipfs/QmT7g6zhXE5qUQEgZ5fgjPfK9HKZosatSiBVG4h6wN2JUc` in the browser. You should see a JSON with info about your local IPFS node


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

#### `ipfs.utils.*`

 * `ipfs.utils.hexToString(hex)`
 * `ipfs.utils.stringToHex(string)`
 * `ipfs.utils.base58ToHex(base58)`
 * `ipfs.utils.hexToBase58(hex)`


