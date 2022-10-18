import { ethers } from 'ethers'
import abi from './contract/ERC20BurnPausable.json'

console.log("1:", abi.abi)
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const usdtContact = new ethers.Contract("0x95903BE0DF352cf5CB97c646B89E231099632990", abi.abi, signer)

export default usdtContact;