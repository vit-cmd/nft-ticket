import React, {useState, useEffect, useContext, SetStateAction, useCallback} from 'react';
import {ethers} from 'ethers';
import web3Modal from 'web3modal';

// INTERNAL IMPORT
import EventSol from '../../@artifacts/contracts/Event.sol/Event.json';

interface ITicketNFTContext {
  currentAccount: string;
  titleData: string;
  accountBalance: string;
  openError: boolean;
  error: string;
  setOpenError: React.Dispatch<SetStateAction<boolean>>;
  connectWallet(): Promise<void>;
  checkIfWalletConnected(): Promise<void>;
}

const EventContractAddress = process.env.EVENT_CONTRACT as string;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider: any) =>
  new ethers.Contract(EventContractAddress, EventSol.abi, signerOrProvider);

export const TicketNFTContext = React.createContext({} as ITicketNFTContext);

export const TicketNFTMarketplaceProvider = (props: {children: any}) => {
  // ------ Global
  const titleData = 'Event, Ticket, and sell NFTs';

  //------USESTATE
  const [error, setError] = useState<string>('');
  const [openError, setOpenError] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [accountBalance, setAccountBalance] = useState<string>('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  
  //---CHECK IF WALLET IS Installed
  const checkInstalledMetamask = useCallback((): void => {
    const {ethereum} = window;
    if (!ethereum) {
      setOpenError(true), setError('Install MetaMask');
      return;
    }
    ethereum.on('accountsChanged', async (accounts: string[]) => {
      setCurrentAccount(accounts[0]);
      if (provider) {
        const balanceBigNumber = await provider.getBalance(accounts[0]);
        const balance = ethers.utils.formatEther(balanceBigNumber);
        setAccountBalance(balance);
      }
    });
  }, [provider]);

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      const web3modal = new web3Modal();
      const connection = await web3modal.connect();
      const _provider = new ethers.providers.Web3Provider(connection);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const balanceBigNumber = await _provider.getBalance(accounts[0]);
      const balance = ethers.utils.formatEther(balanceBigNumber);

      setProvider(_provider);
      setCurrentAccount(accounts[0]);
      setAccountBalance(balance);
    } catch (error) {
      setError('Error while connecting to wallet');
      setOpenError(true);
    }
  };

  async function checkIfWalletConnected(): Promise<void> {
    try {
      // const connection = await web3Modal.connect();
      // const provider = new ethers.providers.Web3Provider(connection);
      // const signer = provider.getSigner();

      setProvider(provider);
      setSigner(signer);

      // Subscribe to accounts change
      // connection.on('accountsChanged', (accounts: string[]) => {
      //   console.log(accounts);
      // });

      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log(accounts[0]);
      } else {
        setError('No Account Found');
        setOpenError(true);
      }

      // const getBalance = await provider.getBalance(accounts[0]);
      // const bal = ethers.utils.formatEther(getBalance);
      // setAccountBalance(bal);
    } catch (error) {
      setError('Something wrong while connecting to wallet');
      setOpenError(true);
    }
  }

  useEffect(() => {
    checkInstalledMetamask();
  }, [checkInstalledMetamask, currentAccount]);

  return (
    <TicketNFTContext.Provider
      value={{
        currentAccount,
        titleData,
        checkIfWalletConnected,
        connectWallet,
        accountBalance,
        setOpenError,
        openError,
        error
      }}
    >
      {props.children}
    </TicketNFTContext.Provider>
  );
};
