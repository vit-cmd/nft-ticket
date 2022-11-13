import { ethers } from "ethers";
import { Props } from "next/script";
import React, { useCallback, useEffect, useState } from "react";
import { Event } from "../../@types/contracts/Event";
import EventSol from "../../@artifacts/contracts/Event.sol/Event.json";

export interface IConnection {
  // variable
  currentAccount: string;
  accountBalance: string;
  openError: boolean;
  error: string;
  eventManager: boolean;
  admin: boolean;
  provider: ethers.providers.Web3Provider | undefined;
  // state
  setOpenError: React.Dispatch<React.SetStateAction<boolean>>;
  // function
  connectWallet(): Promise<void>;
  checkEventManager(
    _provider: ethers.providers.Web3Provider,
    _currentAccount: string
  ): Promise<boolean>;
}

const ADDRESS_EVENT_CONTRACT = process.env.NEXT_PUBLIC_EVENT_CONTRACT;
const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

export const ConnectionContext = React.createContext<IConnection>(
  {} as IConnection
);

export function connectContract(
  addressContract: string,
  abi: ethers.ContractInterface,
  signer?: ethers.Signer
): ethers.Contract {
  return new ethers.Contract(addressContract, abi, signer);
}

export const ConnectionProvider: React.FC<Props> = ({ children }) => {
  //------USESTATE
  const [error, setError] = useState<string>("");
  const [openError, setOpenError] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [accountBalance, setAccountBalance] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [eventManager, setEventManager] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  //---CHECK IF WALLET IS Installed
  const listenChangeAccount = useCallback((): void => {
    const { ethereum } = window as any;
    if (!ethereum) {
      return;
    }
    ethereum.on("accountsChanged", async (accounts: string[]) => {
      const _currentAccount = accounts[0] ?? "";
      setCurrentAccount(_currentAccount);
      if (provider && _currentAccount) {
        const balanceBigNumber = await provider.getBalance(_currentAccount);
        const balance = ethers.utils.formatEther(balanceBigNumber);
        const isEventManager = await checkEventManager(provider, accounts[0]);
        const isAdmin = checkAdmin(accounts[0]);

        setEventManager(isEventManager);
        setAdmin(isAdmin);
        setAccountBalance(balance);
      }
    });
  }, [provider]);

  //---CONNET WALLET FUNCTION
  const connectWallet = async (): Promise<void> => {
    const { ethereum } = window as any;
    if (!ethereum) {
      setOpenError(true);
      setError("Install MetaMask");
      return;
    }

    const _provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const balanceBigNumber = await _provider.getBalance(accounts[0]);
    const balance = ethers.utils.formatEther(balanceBigNumber);
    const isEventManager = await checkEventManager(_provider, accounts[0]);
    const isAdmin = checkAdmin(accounts[0]);

    setProvider(_provider);
    setCurrentAccount(accounts[0]);
    setAccountBalance(balance);
    setEventManager(isEventManager);
    setAdmin(isAdmin);
  };

  // Check Event Manager Func
  const checkEventManager = async (
    _provider: ethers.providers.Web3Provider,
    _currentAccount: string
  ): Promise<boolean> => {
    const contract = connectContract(
      ADDRESS_EVENT_CONTRACT!,
      EventSol.abi,
      _provider.getSigner()
    ) as Event;

    const isEventManager = await contract!.getApprovedEventManager(
      _currentAccount
    );

    return isEventManager;
  };

  const checkAdmin = (_currentAccount: string): boolean => {
    return _currentAccount.toLowerCase() === ADMIN_ADDRESS?.toLowerCase()
      ? true
      : false;
  };

  useEffect(() => {
    listenChangeAccount();
  }, [currentAccount, listenChangeAccount]);

  const value: IConnection = {
    currentAccount,
    accountBalance,
    admin,
    openError,
    provider,
    error,
    eventManager,
    setOpenError,
    connectWallet,
    checkEventManager,
  };

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
};
