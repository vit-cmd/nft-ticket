import {Props} from 'next/script';
import React from 'react';
import EventSol from '../../@artifacts/contracts/Event.sol/Event.json';
import {Event} from '../../@types/contracts/Event';
import {connectContract} from './ConnectionContext';
import {ethers} from 'ethers';

export interface IEventContext {
  checkEventManager(_provider: ethers.providers.Web3Provider, _currentAccount: string): Promise<boolean>;
}

const ADDRESS_EVENT_CONTRACT = process.env.NEXT_PUBLIC_EVENT_CONTRACT;

export const EventContext = React.createContext<IEventContext>({} as  IEventContext);

export const EventProvider: React.FC<Props> = ({children}) => {
  // Check Event Manager Func
  const checkEventManager = async (
    _provider: ethers.providers.Web3Provider,
    _currentAccount: string
  ): Promise<boolean> => {
    const _signer = _provider.getSigner();
    const contract = connectContract(ADDRESS_EVENT_CONTRACT!, EventSol.abi, _signer);
    // const contract2 = connectContract(_signer);

    const isEventManager = await contract!.getApprovedEventManager(_currentAccount);
    // const transaction = await contract2!.approveEventManager(
    //   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    // );
    // await transaction.wait();
    return isEventManager;
  };

  const value: IEventContext = {checkEventManager};

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
