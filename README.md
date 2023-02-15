# fvm-credentials 
A ZKP-based credential store and KYC system on FVM and IPFS. Allows clients to trustlessly verify a credential holder's identity.
### About
In order to allow a verifier to trustlessly verify a credential holder's identity claim, we have built a credential store, a DID Architecture and a DID Registry on FVM so that a certificate holder can upload their documents to the credential store. No actual documents leave the holder's system ever and only other hashes of the credentials and metadata get stored on IPFS.

### Installation

```bash
npm install fvm-credentials
```
### Development

-   Install Dependencies.

```sh
npm install
```

-   To run the test.

```sh
npm test
```
---

### Technologies Used

-   [Node](https://nodejs.org)
-   [FVM](https://fvm.filecoin.io/)
-   [IPFS](https://ipfs.tech/)
-   [Babel](https://babeljs.io/)

### Dependency Packages and repositories

-   [fvm-did-registrar](https://github.com/amany9000/fvm-did-registrar)
-   [fvm-did-resolver](https://github.com/amany9000/fvm-did-resolver)
-   [fvm-did-registry-contract](https://github.com/amany9000/fvm-did-registry-contract)

---

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

### Team Members

-   [Divyesh Puri](https://github.com/DivyeshPuri)
-   [Pushkar Patel](https://github.com/thepushkarp/)
-   [Aman Yadav](https://github.com/amany9000)

---

Found a bug? Create an [issue](https://github.com/thepushkarp/fvm-credentials/issues).
