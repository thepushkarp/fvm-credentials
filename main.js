/*
import * as IPFS from 'ipfs-core'

const ipfs = await IPFS.create()
const { cid } = await ipfs.add('Hello world')
console.info(cid)

*/

import { createDID, registerDID } from "fvm-did-registrar";
import  {Resolver} from "did-resolver";
import * as didFVM from 'fvm-did-resolver';

/*import {promises} from "fs";
import {readFile} from promises;*/

import { promises } from "fs";
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

async function register_DID(did, cid, privateKey) {
	try {
		const txHash = await registerDID(
			did,
			privateKey,
			"https://wallaby.node.glif.io/rpc/v0",
			"0xD3c51785968E4Cdb55726c85194eB97105b99b80",
			cid
		);
		return { address, publicKeyBase58, did };
	} catch (error) {
		if (error){
			try {
				return error.toString().split("returnedHash")[1].split('"')[1];
			} catch (error2) {
				console.log(`Error occurred while registering DID ${error}`);
				throw error2;
			}
		}
	}
}


async function resolve_DID(did) {
	try {
		const myResolver = didFVM.getResolver()
		const resolver = new Resolver(myResolver)
		
		return resolver.resolve(did)
	} catch (error) {
		console.log(`Error occurred while creating DID ${error}`);
		throw error;
	}
}

export { getLocationHash, genCID, create_DID, hash, register_DID, resolve_DID };
//console.log(createDID("d63587a928df21367447c1db17ae68a8d4d2a90b26de1e2abe3170bf2bf4fead"))

/*const signature = payload.pop()
        console.log("payload")
        console.log("Address ",  getAddress(payload, signature))*/
/*
genCID(
	["0x2d5901cbcea77ef9e9d333672814", "0x2d5901cbcea77ef9e9d333672814"],
	"0x2d5901cbcea77ef9e9d33367281463ed10d6146c1bc08679489b338949ef2b89"
).then(async (cid) => {
	console.log(cid);
	const data = await ipfs.cat(cid).next();
	console.log(
		"Data read back via ipfs.cat:",
		new TextDecoder().decode(data.value)
	);
});
*/

