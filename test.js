import {
	getLocationHash,
	genCID,
	create_DID,
	hash,
	register_DID,
} from "./main.js";

function test() {
	getLocationHash(["index.js", "package.json", "package-lock.json"]).then(
		(files64) => {
			console.log("FileHashList", files64);
			const privateKey =
				"0x2d5901cbcea77ef9e9d33367281463ed10d6146c1bc08679489b338949ef2b89";
			genCID(files64, privateKey).then(async (cid) => {
				console.log("CID: ", cid);
				create_DID(privateKey).then((obj) => {
					console.log("DID Object: ", obj);
					register_DID(obj.did, cid, privateKey).then((tx_hash) =>
						console.log(
							"Successful TX_HASH of Registration",
							tx_hash,
							"\n Transaction is actually successfull, error because of misalignment of web3 and FVM"
						)
					);
				});

				//const data = await ipfs.cat(cid).next()
				//console.log('Data read back via ipfs.cat:',  new TextDecoder().decode(data.value))
			});
		}
	);
}

//test();
