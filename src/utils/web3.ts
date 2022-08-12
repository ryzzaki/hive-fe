import { ethers } from 'ethers';
import { manager } from '../constants/manager';

export const isCorrectNetwork = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { chainId } = await provider.getNetwork();
  return chainId === manager.network.chainId;
};
