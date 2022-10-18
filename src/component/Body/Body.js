import React, { useState } from "react";
import { ethers, utils } from "ethers";
import styles from "./Body.module.css";
import usdtContact from "../../contract";

const Body = () => {
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState("");
  const [balance, setBalance] = useState("");
  const [currentBlock, setCurrentBlock] = useState("");
  const [chainId, setChainId] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const getChainId = async () => {
    try {
      const result = await window.ethereum.request({
        method: "eth_chainId",
      });
      setChainId(result);
    } catch (error) {
      console.log(error);
    }
  };
  const getSigner = async () => {
    try {
      const signer = provider.getSigner();
      const result = await signer.signMessage("hello");
      setSigner(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async (wallet) => {
    try {
      const result = await provider.getBalance(wallet);
      setBalance(ethers.utils.formatEther(result));
    } catch (error) {
      console.log(error);
    }
  };

  const getAccounts = async () => {
    try {
      const result = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(result)
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentBlock = async () => {
    try {
      const result = await provider.getBlockNumber();
      setCurrentBlock(result);
    } catch (error) {
      console.log(error);
    }
  };

  const transferDataExample = async () => {
    try {
      const amountWei = utils.parseUnits("100", 18);
      const targetAdress = "0x4667173ed8acEB331a1A461A292dD7EB2234A732";
      const options = {
        gasLimit: 1500000,
        gasPrice: ethers.utils.parseUnits("1.0", "gwei"),
      };
      await usdtContact.transfer(targetAdress, amountWei, options);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.actions}>
        <button onClick={getAccounts}> Get Account</button>
        <button onClick={getSigner}> Get Signer </button>
        <button onClick={() => getBalance(account)}> Get Balance</button>
        <button onClick={getCurrentBlock}>Get Current Block</button>
        <button onClick={transferDataExample}>Transfer Data</button>
        <button onClick={getChainId}>Get chainId</button>
      </div>
      <div>Signer: {signer} </div>
      <div>Account address:{account}</div>
      <div>Balance: {balance}</div>
      <div>Current Block: {currentBlock}</div>
      <div>ChainId: {chainId}</div>
    </div>
  );
};
export default Body;
