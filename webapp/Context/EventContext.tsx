import {Props} from 'next/script';
import React from 'react';
import EventSol from '../../@artifacts/contracts/Event.sol/Event.json';
import {Event} from '../../@types/contracts/Event';
import {connectContract} from './ConnectionContext';
import {ethers} from 'ethers';

export interface IEventContext {
  approveEventManager(_provider: ethers.providers.Web3Provider, _address: string): Promise<void>;
  createEvent(
    provider: ethers.providers.Web3Provider,
    eventName: string,
    location: string,
    description: string,
    hashImage: string,
    price: number,
    startDay: number,
    endDay: number
  ): Promise<void>;
}

const ADDRESS_EVENT_CONTRACT = process.env.NEXT_PUBLIC_EVENT_CONTRACT;

export const EventContext = React.createContext<IEventContext>({} as IEventContext);

export const EventProvider: React.FC<Props> = ({children}) => {
  // Aprrove Event Manager Func
  const approveEventManager = async (_provider: ethers.providers.Web3Provider, _address: string): Promise<void> => {
    const contract = connectContract(ADDRESS_EVENT_CONTRACT!, EventSol.abi, _provider.getSigner()) as Event;

    try {
      const transaction = await contract!.approveEventManager(_address);
      await transaction.wait();
      alert('Approve success');
    } catch (error: any) {
      console.log(error.message);
      // if()
      // if(error.)
    }
  };

  // Create event in bockchain
  const createEvent = async (
    provider: ethers.providers.Web3Provider,
    eventName: string,
    location: string,
    description: string,
    hashImage: string,
    price: number,
    startDay: number,
    endDay: number
  ): Promise<void> => {
    const signer = provider.getSigner();
    const contract = connectContract(ADDRESS_EVENT_CONTRACT!, EventSol.abi, signer) as Event;

    try {
      const transaction = await contract.createEvent(
        eventName,
        location,
        description,
        hashImage,
        price,
        startDay,
        endDay
      );
      await transaction.wait();
      alert('Create event successfully');
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const value: IEventContext = {approveEventManager, createEvent};

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
