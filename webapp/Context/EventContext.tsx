import { Props } from "next/script";
import React, { useContext } from "react";
import EventSol from "../../@artifacts/contracts/Event.sol/Event.json";
import { Event } from "../../@types/contracts/Event";
import { connectContract, ConnectionContext } from "./ConnectionContext";
import { ethers } from "ethers";

export interface IEventContext {
  approveEventManager(
    _provider: ethers.providers.Web3Provider,
    _address: string
  ): Promise<void>;
}

const ADDRESS_EVENT_CONTRACT = process.env.NEXT_PUBLIC_EVENT_CONTRACT;

export const EventContext = React.createContext<IEventContext>(
  {} as IEventContext
);

export const EventProvider: React.FC<Props> = ({ children }) => {
  // Aprrove Event Manager Func
  const approveEventManager = async (
    _provider: ethers.providers.Web3Provider,
    _address: string
  ): Promise<void> => {
    const contract = connectContract(
      ADDRESS_EVENT_CONTRACT!,
      EventSol.abi,
      _provider.getSigner()
    ) as Event;

    try {
      const transaction = await contract!.approveEventManager(_address);
      await transaction.wait();
      alert("Approve success");
    } catch (error: any) {
      console.log(error.message);
      // if()
      // if(error.)
    }
  };

  const value: IEventContext = { approveEventManager };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
