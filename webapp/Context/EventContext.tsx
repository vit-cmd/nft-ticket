import {Props} from 'next/script';
import React from 'react';
import EventSol from '../../@artifacts/contracts/Event.sol/Event.json';
import {Event} from '../../@types/contracts/Event';
import {connectContract} from './ConnectionContext';
import {ethers} from 'ethers';

export interface IEventContext {
  approveOrDisableEventManager(
    _provider: ethers.providers.Web3Provider,
    _address: string,
    _status: boolean
  ): Promise<void>;
  createEvent(
    provider: ethers.providers.Web3Provider,
    eventName: string,
    location: string,
    description: string,
    hashImage: string,
    startDay: number,
    endDay: number
  ): Promise<void>;
}

const ADDRESS_EVENT_CONTRACT = process.env.NEXT_PUBLIC_EVENT_CONTRACT;

export const EventContext = React.createContext<IEventContext>({} as IEventContext);

export const EventProvider: React.FC<Props> = ({children}) => {
  // Aprrove Event Manager Func
  const approveOrDisableEventManager = async (
    _provider: ethers.providers.Web3Provider,
    _address: string,
    _status: boolean
  ): Promise<void> => {
    const contract = connectContract(ADDRESS_EVENT_CONTRACT!, EventSol.abi, _provider.getSigner()) as Event;

    try {
      const transaction = await contract!.approveOrDisableEventManager(_address, _status);
      await transaction.wait();
      const actionName = _status === true ? 'Approve' : 'Disable';
      alert(`${actionName} successfully`);
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
    startDay: number,
    endDay: number
  ): Promise<void> => {
    const signer = provider.getSigner();
    const contract = connectContract(ADDRESS_EVENT_CONTRACT!, EventSol.abi, signer) as Event;

    try {
      const transaction = await contract.createEvent(eventName, location, description, hashImage, startDay, endDay);
      await transaction.wait();
      alert('Create event successfully');
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const value: IEventContext = {approveOrDisableEventManager, createEvent};

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
