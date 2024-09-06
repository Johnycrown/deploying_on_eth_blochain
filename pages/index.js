import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [newOwner, setNewOwner] = useState(""); // State for the new owner input

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const transferOwnership = async () => {
    if (atm) {
      try {
        let tx = await atm.transferOwnership(newOwner);
        await tx.wait();
        alert(`Ownership transferred to ${newOwner}`);
      } catch (err) {
        console.error(err);
        alert("Error transferring ownership");
      }
    }
  };

  const closeAccount = async () => {
    if (atm) {
      try {
        let tx = await atm.closeAccount();
        await tx.wait();
        alert("Account closed and contract destroyed");
      } catch (err) {
        console.error(err);
        alert("Error closing the account");
      }
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button className="btn" onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button className="btn" onClick={deposit}>
          Deposit 1 ETH
        </button>
        <button className="btn" onClick={withdraw}>
          Withdraw 1 ETH
        </button>

        {/* New Owner Input and Transfer Ownership Button */}
        <div className="owner-section">
          <input
            type="text"
            placeholder="New Owner Address"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
          />
          <button className="btn" onClick={transferOwnership}>
            Transfer Ownership
          </button>
        </div>

        {/* Close Account Button */}
        <button className="btn danger" onClick={closeAccount}>
          Close Account
        </button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Online Crypto Trading!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #1e293b; /* Dark blue background */
          color: #f8fafc; /* Light text color */
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        .btn {
          background-color: #0ea5e9; /* Bright blue for buttons */
          color: white;
          border: none;
          padding: 10px 20px;
          margin: 10px;
          cursor: pointer;
          font-size: 1rem;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #0284c7; /* Slightly darker blue on hover */
        }
        .btn.danger {
          background-color: #ef4444; /* Red for dangerous actions */
        }
        .btn.danger:hover {
          background-color: #dc2626; /* Darker red on hover */
        }
        p {
          font-size: 1.2rem;
          margin: 10px 0;
        }
        .owner-section {
          margin-top: 20px;
        }
        input {
          padding: 10px;
          font-size: 1rem;
          margin-right: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
      `}</style>
    </main>
  );
}
