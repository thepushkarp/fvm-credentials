import {
	getLocationHash,
	genCID,
	create_DID,
	hash,
	register_DID,
	resolve_DID
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


async function test_resolve(){
	const did = "did:fvm:testnet:0x0a0399bD22D2E146f802866b146abb122c1daa46";
	console.log("here", await resolve_DID(did))
}
test_resolve()

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