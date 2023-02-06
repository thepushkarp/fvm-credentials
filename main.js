/*
import * as IPFS from 'ipfs-core'

const ipfs = await IPFS.create()
const { cid } = await ipfs.add('Hello world')
console.info(cid)

*/

import { createDID, registerDID, registerDIDSigner } from "fvm-did-registrar";
import  {Resolver} from "did-resolver";
import * as didFVM from 'fvm-did-resolver';

/*import {promises} from "fs";
import {readFile} from promises;*/

import crypto from "crypto";

//import * as IPFS from 'ipfs'
//const ipfs = await IPFS.create()

import { create } from "ipfs-http-client";

const projectId = "2IQcCvMGSRJ0qKVdEBAEA38amJa";
const projectSecret = "842fad0b2300ddbace70d3b75b8492e1";
const auth =
	"Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const ipfs = create({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

import Web3 from "web3";
const web3 = new Web3();

async function getLocationHash(file_locations) {
	try {
		return Promise.all(
			file_locations.map((file) => {
				return promises.readFile(file);
			})
		)
			.then((fileBuffers) => {
				return fileBuffers.map((fileBuffer) => {
					const b64 = fileBuffer.toString("base64");

					return hash(b64);
				});
			})
			.catch((error) => {
				console.error(error.message);
				process.exit(1);
			});
	} catch (error) {
		console.log(`Error occurred while creating DID ${error}`);
		throw error;
	}
}


async function getHash(base64List) {
	try {;
		let hashList = [];
		base64List.forEach(element => {
			hashList.push(hash(element))
		});
		return hashList;
	} catch (error) {
		console.log(`Error occurred while hashing data ${error}`);
		throw error;
	}
}

async function genCID(hashList, privateKey) {
	try {
		const concatenatedHashes = hashList.join();
		hashList.push(
			web3.eth.accounts.sign(concatenatedHashes, privateKey).signature
		);
		const { path } = await ipfs.add(JSON.stringify(hashList));
		//setTimeout(() => console.log("Sleeeping"), 5000)
		//ipfs.stop()
		return path;
	} catch (error) {
		console.log(`Error occurred while creating DID ${error}`);
		throw error;
	}
}

async function genCIDFunc(hashList, sigFunc) {
	try {
		const concatenatedHashes = hashList.join();
		hashList.push(sigFunc(concatenatedHashes));

		const { path } = await ipfs.add(JSON.stringify(hashList));
		//setTimeout(() => console.log("Sleeeping"), 5000)
		//ipfs.stop()
		return path;
	} catch (error) {
		console.log(`Error occurred while creating DID ${error}`);
		throw error;
	}
}

function hash(base64Data) {
	try {
		return crypto.createHash("sha256").update(base64Data).digest("hex");
	} catch (error) {
		console.log(`Error occurred while hashing ${error}`);
		throw error;
	}
}

function getAddress(hashList, signature) {
	try {
		const concatenatedHashes = hashList.join("");
		return web3.eth.accounts.recover(concatenatedHashes, signature);
	} catch (error) {
		console.log(`Error occurred while creating DID ${error}`);
		throw error;
	}
}

async function create_DID(privateKey) {
	try {
		const network = "testnet";
		const {
			data: { address, publicKeyBase58, did },
		} = await createDID(network, privateKey);
		return { address, publicKeyBase58, did };
	} catch (error) {
		console.log(`Error occurred while creating DID ${error}`);
		throw error;
	}
}

function create_DID_Address(address) {
	try {
		if (!address.match(/^0x[0-9a-fA-F]{40}$/))
			throw "Address not correct";
		
			return {did : `did:fvm:testnet:${address}`};
	} catch (error) {
		console.log(`Error occurred while creating DID ${error}`);
		throw error;
	}
}

async function register_DID(did, cid, privateKey) {
	try {
		const tx = await registerDID(
			did,
			privateKey,
			"https://api.hyperspace.node.glif.io/rpc/v1",
			"0x74Cff4ee330854182D6FF5A2Bbe3449037e8b0Df",
			cid
		);
		return tx.data.txnHash.hash;
	} catch (error) {
		console.log(`Error occurred while registering DID ${error}`);
		throw error;
	}
}

async function register_DIDSigner(did, cid, signer) {
	try {
		const tx = await registerDIDSigner(
			did,
			signer,
			"https://api.hyperspace.node.glif.io/rpc/v1",
			"0x74Cff4ee330854182D6FF5A2Bbe3449037e8b0Df",
			cid
		);
		return tx.data.txnHash.hash;
	} catch (error) {
		console.log(`Error occurred while registering DID ${error}`);
		throw error;
	}
}

async function resolve_DID(did) {
	try {
		const myResolver = didFVM.getResolver()
		const resolver = new Resolver({...myResolver})

		return resolver.resolve(did)
	} catch (error) {
		console.log(`Error occurred while resolving DID ${error}`);
		throw error;
	}
}

async function verify(b64_file, did) {
	try {
		return resolve_DID(did).then( async ({didDocument, didDocumentMetadata , didResolutionMetadata})  => {
			const serviceOBj = JSON.parse(didDocument[0]).service;
			const encodedData = await ipfs.cat(serviceOBj[0].serviceEndpoint).next();
			const data = new TextDecoder().decode(encodedData.value);
			const hashList = JSON.parse(data);
			
			//TODO: verify signature
			
			const signature = hashList.pop();
			const concatenatedHashes = hashList.join();
			const addr = web3.eth.accounts.recover(concatenatedHashes, signature);
			
			if (addr !== did.split(":")[3])
				return {"verification": "invalid", "reason": "Credential Store Signature not done by DID Privatekey"}

			const _hash = hash(b64_file);
			if (hashList.indexOf(_hash) == -1)
				return {"verification": "invalid", "reason": "File Hash not present on IPFS CID from DID document"}

			return {"verification" : "valid"};
		})
	} catch (error) {
		console.log(`Error occurred while verifying file ${error}`);
		throw error;
	}
}

export { getLocationHash, getHash, genCID, genCIDFunc, create_DID, create_DID_Address, hash, register_DID, register_DIDSigner, resolve_DID, verify };


