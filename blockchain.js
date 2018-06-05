const SHA256 = require('crypto-js/sha256')

class Transaction{
	
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block {
	
	constructor(timestamp, transactions, previousHash = '') {
		this.index = 0;
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = "0";
		this.hash = this.calculateHash();
		this.nonce = 0;
	}
	
	calculateHash() {
	
		return SHA256(this.index = this.previousHash + this.timestamp + this.transactions + this.nonce).toString();
			
	}
	
	mineBlock(difficulty) {
	
		while (this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
		
		console.log("BLOCK MINED: " + this.hash);
	}
}

class Blockchain{


	constructor() {
		this.chain = [this.createGenesis()];
		this.difficulty = 2;
		
		this.pendingTransactions = [];
		this.miningReward = 100;
	}
	
	createGenesis() {
		
		return new Block(0, "6/4/18", "Genesis Block", "0")
	}
	
	latestBlock() {
		return this.chain[this.chain.length - 1]
	}
		
	createTransaction(transaction) {
		this.pendingTransactions.push(transaction);
	}
	
	
	minePendingTransactions(miningRewardAddress) {

    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    this.chain.push(block);

    this.pendingTransactions = [
        new Transaction(null, miningRewardAddress, this.miningReward)
    ];
}
		

	
	checkValid() {

	for(let index = 1; index < this.chain.length; index++) {
		const currentBlock = this.chain[index];
		const previousBlock = this.chain[index-1];
		
		if (currentBlock.hash !== currentBlock.calculateHash()) {
			return false;
			}
		
		if (currentBlock.previousHash !== previousBlock.hash) {
			return false;
			}
		}	
	
	return true;

	}
	
getBalanceOfAddress(address){
    let balance = 0; 


    for(const block of this.chain){
        for(const trans of block.transactions){

            if(trans.fromAddress === address){
                balance -= trans.amount;
            }

            if(trans.toAddress === address){
                balance += trans.amount;
            }
        }
    }

    return balance;
}

}


	let testCoin = new Blockchain();
	
	console.log('Sending testcoin...');
	
	testCoin.createTransaction(new Transaction('address1', 'address2', 100));
	testCoin.createTransaction(new Transaction('address2', 'address1', 50));

	console.log('Starting the mining...');
	testCoin.minePendingTransactions('MyAddress');
		
	console.log('balance of MyAddress is', testCoin.getBalanceOfAddress('MyAddress'));
	
	console.log('Starting the miner again...');
	testCoin.minePendingTransactions('MyAddress');
	console.log('balance of MyAddress is', testCoin.getBalanceOfAddress('MyAddress'));
	
