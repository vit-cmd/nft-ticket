import {ethers} from 'ethers';
import {Props} from 'next/script';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {EventContext} from './EventContext';

export interface IConnection {
  // variable
  currentAccount: string;
  accountBalance: string;
  openError: boolean;
  error: string;
  eventManager: boolean;
  // state
  setOpenError: React.Dispatch<React.SetStateAction<boolean>>;
  // function
  connectWallet(): Promise<void>;
}

export const ConnectionContext = React.createContext<IConnection>({} as IConnection);

export function connectContract(
  addressContract: string,
  abi: ethers.ContractInterface,
  signer?: ethers.Signer
): ethers.Contract {
  return new ethers.Contract(addressContract, abi, signer);
}

export const ConnectionProvider: React.FC<Props> = ({children}) => {
  //------USESTATE
  const [error, setError] = useState<string>('');
  const [openError, setOpenError] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [accountBalance, setAccountBalance] = useState<string>('');
  const [eventManager, setEventManager] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  //----- Context
  const {checkEventManager} = useContext(EventContext);

  //---CHECK IF WALLET IS Installed
  const listenChangeAccount = useCallback((): void => {
    const {ethereum} = window as any;
    if (!ethereum) {
      return;
    }
    ethereum.on('accountsChanged', async (accounts: string[]) => {
      const _currentAccount = accounts[0] ?? '';
      setCurrentAccount(_currentAccount);
      if (provider && _currentAccount) {
        const balanceBigNumber = await provider.getBalance(_currentAccount);
        const balance = ethers.utils.formatEther(balanceBigNumber);
        const isEventManager = await checkEventManager(provider, accounts[0]);

        setEventManager(isEventManager);
        setAccountBalance(balance);
      }
    });
  }, [checkEventManager, provider]);

  //---CONNET WALLET FUNCTION
  const connectWallet = async (): Promise<void> => {
    const {ethereum} = window as any;
    if (!ethereum) {
      setOpenError(true);
      setError('Install MetaMask');
      return;
    }
    const _provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    const balanceBigNumber = await _provider.getBalance(accounts[0]);
    const balance = ethers.utils.formatEther(balanceBigNumber);
    const isEventManager = await checkEventManager(_provider, accounts[0]);

    setProvider(_provider);
    setCurrentAccount(accounts[0]);
    setAccountBalance(balance);
    setEventManager(isEventManager);
  };

  useEffect(() => {
    listenChangeAccount();
  }, [currentAccount, listenChangeAccount]);

  const value: IConnection = {
    currentAccount,
    accountBalance,
    openError,
    error,
    eventManager,
    setOpenError,
    connectWallet
  };

  return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>;
};
