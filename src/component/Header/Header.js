import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
 
  const changeNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          // chainId oof the network before toString
          chainId: `0x${Number(137).toString(16)}`,
          // name of the network
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://polygon-rpc.com/"],
          blockExplorerUrls: ["https://polygonscan.com"],
        },
      ],
    });
  };

  const connectToAccount = async () => {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
  };

  const connectMetamask = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      alert("Please install metamask");
      return;
    } else {
      connectToAccount();
      changeNetwork();
    }
  };

  const changeNetworkEvent = async () => {
    await window.ethereum.on("networkChanged", function(networkId) {
      console.log('networkchanged', networkId);
    })
  }

  const changeWalletEvent = async () => {
    await window.ethereum.on('accountsChanged', function (acconts){
      console.log("accountsChanges:", acconts)
    })
  }

  return (
    <div>
      <div className={styles.headerWrapper}>
        <div className={styles.headerTitle}>Blockchain basic</div>
        <div className={styles.actions}>
          <button onClick={connectMetamask}>Connect to Metamask</button>
          <button onClick={() => changeNetworkEvent(65)}>Change network Event</button>
          <button onClick={() => changeWalletEvent(account?.[0])}>Change wallet Event</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
