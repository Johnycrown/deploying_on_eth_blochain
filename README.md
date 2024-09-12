**Overview**
The Assessment Smart Contract is a simple Solidity-based contract that manages account deposits, withdrawals, and ownership transfers. This contract is designed to allow the owner to deposit and withdraw Ether from the account, transfer ownership, and ultimately close the account, sending any remaining balance back to the owner.

**Features**

*Deposit Funds: Allows the owner to deposit Ether into the contract.

*Withdraw Funds: Allows the owner to withdraw Ether from the contract if sufficient funds are available.

*Transfer Ownership: The owner can transfer account ownership to a new address.

*Account Closure: The owner can close the account, which results in the contract being self-destructed, and any remaining balance is sent to the owner.

**Contract Details**

*Owner: The account owner who has control over deposits, withdrawals, transfers, and account closure.

*Balance: Tracks the balance of the contract in Ether.

**Events**:

*Deposit(uint256 amount): Emitted when a successful deposit is made.
*Withdraw(uint256 amount): Emitted after a successful withdrawal.
*OwnerTransfer(address previousOwner, address newOwner): Emitted when ownership is transferred.
*AccountClosure(address accountOwner): Emitted when the account is closed.








# Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/
