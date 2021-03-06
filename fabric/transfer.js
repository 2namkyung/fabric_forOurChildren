/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..', 'network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('children');

        // Submit the specified transaction.
	//await contract.submitTransaction('TransferAsset', 'Joo', 'Lee', 50000);
	//await contract.submitTransaction('TransferAsset', 'Lee', 'Joo', 150000);
	//await contract.submitTransaction('TransferAsset', 'Park', 'Joo', 200000);
	//await contract.submitTransaction('TransferAsset', 'Hwang', 'Joo', 200000);
	//await contract.submitTransaction('TransferAsset', 'Jin', 'Joo', 200000);
	//await contract.submitTransaction('TransferAsset', 'Choi', 'Joo', 200000);
	await contract.submitTransaction('TransferAsset', 'Joo', 'Tom', 200000);
        console.log('Transaction has been submitted');

	// cant't use shim Interface function
	// await contract.submitTransaction('invoke','Transfer', 'Joo', 'Koo', 200000);

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
