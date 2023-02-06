const { create_DID_Address, resolve_DID } =  require("./dist/index.js");


function test_address(){
	console.log(create_DID_Address("0xA3168f392809CAaC21f20EF5ac99e78d4b6BbD20"))
}
//test_address()

async function test_resolve(){
	console.log(await resolve_DID("did:fvm:testnet:0xA3168f392809CAaC21f20EF5ac99e78d4b6BbD20"))
}
//test_resolve()