**Assessment Contract**

**Project Overview**

Assessment is a Solidity smart contract designed to manage ownership and allow the owner to deposit and withdraw funds. It also includes functionalities for transferring ownership and self-destructing the contract for account closure. The contract uses events for tracking transactions and ownership changes while maintaining security and error handling through custom Solidity errors.

**Description**

The Assessment contract is a simple ownership-based wallet system that allows the following operations:

* Depositing funds by the owner.
* Withdrawing funds from the balance.
* Transferring ownership to another address.
* Closing the account by self-destructing the contract.
  
**Features:**

* Ownership-based access control for key functions.
* Emits events (Deposit, Withdraw, OwnerTransfer, AccountClosure) for monitoring transactions.
* Secure balance management with assertions and custom error handling for insufficient funds.
* Self-destruct functionality to withdraw all funds and terminate the contract.
  
**Getting Started**

Installing
Clone the repository:

  git clone https://github.com/Johnycrown/deploying_on_eth_blochain.git
  
  cd AssessmentContract

Install required dependencies:

  npm install
  
Setup a local Ethereum blockchain or connect to a test network (e.g., Rinkeby).

**Modifications**

To modify the initial balance, update the constructor in Assessment.sol:

constructor(uint initBalance) payable {
    owner = payable(msg.sender);
    balance = initBalance; // Modify this value to set a custom initial balance
}

**Executing Program**

Deploy the Contract

Compile the smart contract:

  npx hardhat compile
  
Deploy the contract to a local blockchain or testnet:

npx hardhat run scripts/deploy.js --network rinkeby


**Help**

Common issues:

Insufficient Balance: If the contract does not have enough balance for withdrawal, it will throw a custom error InsufficientBalance. Ensure the contract has enough balance before attempting large withdrawals.

Example command:

bash
Copy code
npx hardhat withdraw --amount 1000000000000000000 --network rinkeby
For further help, run the command to view available options:

npx hardhat help

**Authors**

Your Name - Johnycrown
GitHub: https://github.com/Johnycrown
