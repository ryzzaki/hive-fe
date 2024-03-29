import { ethers } from 'ethers';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { manager } from '../constants/manager';
import WalletContext from '../utils/context/WalletContext';
import { isCorrectNetwork } from '../utils/web3';
import ArrowIcon from '../assets/icons/arrow.svg';
import Button from './button';
import { bee } from '../constants/bee';

type SwapProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const Swap: React.FC<SwapProps> = ({ showModal, setShowModal }) => {
  const { wallet } = useContext(WalletContext);
  const [managerContract, setManagerContract] = useState<ethers.Contract | undefined>(undefined);
  const [beeContract, setBeeContract] = useState<ethers.Contract | undefined>(undefined);
  const [beeAmount, setBeeAmount] = useState(50);
  const [hiveAmount, setHiveAmount] = useState(0);
  const [beeBalance, setBeeBalance] = useState(0);

  useEffect(() => {
    isCorrectNetwork().then((isCorrect) => {
      if (!isCorrect) {
        return toast('Switch network to Polygon Mumbai!', { icon: '❌' });
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const managerContract = new ethers.Contract(manager.address, manager.abi, signer);
      const beeContract = new ethers.Contract(bee.address, bee.abi, signer);
      setManagerContract(managerContract);
      setBeeContract(beeContract);
    });
  }, [wallet]);

  useEffect(() => {
    if (beeContract && wallet) {
      beeContract.balanceOf(wallet).then((result: any) => {
        setBeeBalance(Number(ethers.utils.formatEther(result)));
      });
    }
  }, [beeContract, wallet]);

  useEffect(() => {
    if (managerContract && wallet) {
      managerContract
        .calculateExchangeAmount(wallet, ethers.utils.parseUnits(String(beeAmount), 'ether').toString())
        .then((result: any) => {
          setHiveAmount(Number(ethers.utils.formatEther(result)));
        });
    }
  }, [managerContract, wallet]);

  const handleApproval = async () => {
    if (!beeContract) {
      return toast('Bee Token Contract Failed Initialization!', { icon: '❌' });
    }
    try {
      const txHash = await beeContract.approve(
        manager.address,
        ethers.utils.parseUnits(String(999999999999999), 'ether').toString()
      );
      await txHash.wait();
      toast('$BEE has been approved!', { icon: '🎉' });
    } catch (e: any) {
      toast(`Something went wrong! ${e.message}`, { icon: '❌' });
    }
  };

  const handleSwap = async () => {
    if (!managerContract) {
      return toast('Bee Token Contract Failed Initialization!', { icon: '❌' });
    }
    try {
      const txHash = await managerContract.convictionBurn(
        ethers.utils.parseUnits(String(beeAmount), 'ether').toString(),
        {
          gasPrice: ethers.utils.parseUnits('40', 'gwei'),
          gasLimit: '300000',
        }
      );
      await txHash.wait();
      toast('$BEE has been swapped!', { icon: '🎉' });
    } catch (e: any) {
      toast(`Something went wrong! ${e.message}`, { icon: '❌' });
    }
  };

  const handleInputChange = (value: string | undefined) => {
    if (managerContract) {
      setBeeAmount(Number(value));
      managerContract
        .calculateExchangeAmount(wallet, ethers.utils.parseUnits(String(value ? value : 0), 'ether').toString())
        .then((result: any) => {
          setHiveAmount(Number(ethers.utils.formatEther(result)));
        });
    }
  };

  return (
    <>
      {showModal && (
        <div className="flex fixed inset-0 z-30 bg-opacity-70 bg-black mx-10">
          <div className="flex flex-col py-2rem px-3rem m-5rem bg-black rounded-md border border-gray-500 mx-auto shadow-lg max-h-[480px] md:max-h-450">
            <div className="flex justify-between font-bold text-gray-300 pb-10">
              <div>Swap $BEE for $HIVE</div>
              <div className="px-7 rounded-full bg-white text-black cursor-pointer" onClick={() => setShowModal(false)}>
                X
              </div>
            </div>
            <div className="text-14 max-w-350 text-gray-400">
              Burn your BEE tokens to acquire the HIVE governance tokens to participate in the decision making and well
              being of the protocol.
            </div>
            <div className="flex justify-between pt-1rem">
              Your balance:{' '}
              <span className="font-bold">
                {beeBalance} <span className="text-amber-500">$BEE</span>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <input
                className="rounded-md bg-black border border-gray-300 px-1rem py-10 my-1rem w-full md:w-350"
                placeholder="50 $BEE"
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <ArrowIcon className="animate-bounce" />
              <input
                className="rounded-md bg-black border border-gray-300 px-1rem py-10 my-1rem w-full md:w-350"
                readOnly={true}
                value={`${hiveAmount} $HIVE`}
              />
              <div className="flex space-x-20 w-full pt-10">
                <Button variation="secondary" className="px-15" onClick={handleApproval}>
                  Approve
                </Button>
                <Button variation="primary" className="w-full" onClick={handleSwap}>
                  Swap
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Swap;
