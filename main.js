/*
import * as IPFS from 'ipfs-core'

const ipfs = await IPFS.create()
const { cid } = await ipfs.add('Hello world')
console.info(cid)

*/

`import { createDID } from "fvm-did-registrar";
import {promises} from "fs";
import {readFile} from promises;`

import {promises} from "fs";
import crypto from 'crypto';

import * as IPFS from 'ipfs-core'
const ipfs = await IPFS.create()

import Web3 from "web3";
const web3 = new Web3();

async function getLocationHash(file_locations){
    try { 
          
        return Promise.all(file_locations.map(file => {
            return promises.readFile(file);
          })).then(fileBuffers => {
        
            return fileBuffers.map(fileBuffer => {
                const b64 = fileBuffer.toString("base64");
                
                return hash(b64)
            });
          

        }).catch(error => {
            console.error(error.message);
            process.exit(1);
          });

    } catch (error) {
          console.log(`Error occurred while creating DID ${error}`);
          throw error;
    }
}

async function genCID(hashList, privateKey){
    try { 
        const concatenatedHashes = hashList.join();
        hashList.push(web3.eth.accounts.sign(concatenatedHashes, privateKey).signature)
        const {path}  = await ipfs.add(JSON.stringify(hashList))
        //setTimeout(() => console.log("Sleeeping"), 5000)
        //ipfs.stop()
        return path
    } catch (error) {
          console.log(`Error occurred while creating DID ${error}`);
          throw error;
    }
}

function hash(base64Data){
    try {
        return crypto.createHash('sha256').update(base64Data).digest('hex');
    } catch (error) {
          console.log(`Error occurred while hashing ${error}`);
          throw error;
    }
}


function getAddress(hashList, signature){
    try { 
        const concatenatedHashes = hashList.join('');
        return web3.eth.accounts.recover(concatenatedHashes, signature)
    } catch (error) {
          console.log(`Error occurred while creating DID ${error}`);
          throw error;
    }
}


async function create_DID(privateKey){
    try {
        const network = 'testnet';
        const {address, publicKey58, _, DID} = await createDID(network, privateKey);
        return {address, publicKey58, DID}
    } catch (error) {
          console.log(`Error occurred while creating DID ${error}`);
          throw error;
    }
}

export default {create_DID, getLocationHash, hash, genCID}
//console.log(createDID("d63587a928df21367447c1db17ae68a8d4d2a90b26de1e2abe3170bf2bf4fead"))




function test(){
    getLocationHash(["test.js", "package.json", "../js-ipfs/package.json"]).then(files64 => {
        console.log("here", files64);
        genCID(files64, "d63587a928df21367447c1db17ae68a8d4d2a90b26de1e2abe3170bf2bf4fead")
                            .then( async (cid) => {
                                console.log("cid", cid)
                                const data = await ipfs.cat(cid).next()
                                console.log('Data read back via ipfs.cat:',  new TextDecoder().decode(data.valuex``))
                            });
        
        /*const signature = payload.pop()
        console.log("payload")
        console.log("Address ",  getAddress(payload, signature))*/


        //files64.map(b64 => console.log(Buffer.from(b64 ,'base64').toString('ascii')))
    })
} 

test()