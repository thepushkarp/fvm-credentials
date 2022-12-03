/*
import * as IPFS from 'ipfs-core'

const ipfs = await IPFS.create()
const { cid } = await ipfs.add('Hello world')
console.info(cid)

*/

import { createDID } from "fvm-did-registrar";


async function getCredentialHash(privateKey){
    try {
        const network = 'testnet';
        const {address, publicKey58, _, DID} = await createDID(network, privateKey);
        return {address, publicKey58, DID}
    } catch (error) {
          logger.error(`Error occurred while creating DID ${error}`);
          throw error;
    }
}


async function create_DID(privateKey){
    try {
        const network = 'testnet';
        const {address, publicKey58, _, DID} = await createDID(network, privateKey);
        return {address, publicKey58, DID}
    } catch (error) {
          logger.error(`Error occurred while creating DID ${error}`);
          throw error;
    }
}

export default {create_DID, getCredentialHash}
console.log(createDID("d63587a928df21367447c1db17ae68a8d4d2a90b26de1e2abe3170bf2bf4fead"))
