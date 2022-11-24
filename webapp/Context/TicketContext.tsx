import React, { useContext } from 'react';
import { ethers } from 'ethers';
import { ConnectionContext, connectContract } from './ConnectionContext';
import TicketSol from '../../@artifacts/contracts/Ticket.sol/Ticket.json';
import { Ticket } from '../../@types/contracts/Ticket';

interface ITicketContext {
  transferTicket(_from: string, _to: string, _tokenID: string): Promise<void>;
  listingTicketForSale(_tokenID: string, _price: number): Promise<void>;
  cancelListingTicket(_tokenID: string): Promise<void>;
  updateTicketPrice(_tokenID: string, _price: number): Promise<void>;
  buyTicketNFT(_tokenID: string, _price: number): Promise<void>;
}

// Create TicketContext
export const TicketContext = React.createContext({} as ITicketContext);

const ADDRESS_TICKET_CONTRACT = process.env.NEXT_PUBLIC_TICKET_CONTRACT;

export const TicketProvider = (props: { children: any }) => {
  const { provider } = useContext(ConnectionContext);
  // Transfer Ticket
  const transferTicket = async (
    _from: string,
    _to: string,
    _tokenID: string
  ): Promise<void> => {
    const contract = connectContract(
      ADDRESS_TICKET_CONTRACT!,
      TicketSol.abi,
      provider!.getSigner()
    ) as Ticket;

    await contract.transferFrom(_from, _to, _tokenID);
    alert('Transfer successfully');
  };

  // Set ticket for sale
  const listingTicketForSale = async (
    _tokenID: string,
    _price: number
  ): Promise<void> => {
    const contract = connectContract(
      ADDRESS_TICKET_CONTRACT!,
      TicketSol.abi,
      provider!.getSigner()
    ) as Ticket;

    await contract.setTicketForSale(_tokenID, _price);
    alert('Listing ticket successfully');
  };

  // Cancel listing ticket
  const cancelListingTicket = async (_tokenID: string): Promise<void> => {
    const contract = connectContract(
      ADDRESS_TICKET_CONTRACT!,
      TicketSol.abi,
      provider!.getSigner()
    ) as Ticket;

    await contract.cancelTicketSale(_tokenID);
    alert('Cancel listing ticket successfully');
  };

  // Buy NFT
  const buyTicketNFT = async (
    _tokenID: string,
    _price: number
  ): Promise<void> => {
    const contract = connectContract(
      ADDRESS_TICKET_CONTRACT!,
      TicketSol.abi,
      provider!.getSigner()
    ) as Ticket;

    await contract.buyTicketFromAttendee(_tokenID, {
      value: ethers.utils.parseEther(_price.toString()),
    });
    alert('Buy ticket successfully');
  };

  // Change sale price of ticket
  const updateTicketPrice = async (
    _tokenID: string,
    _price: number
  ): Promise<void> => {
    const contract = connectContract(
      ADDRESS_TICKET_CONTRACT!,
      TicketSol.abi,
      provider!.getSigner()
    ) as Ticket;

    await contract.setTicketPrice(_tokenID, _price);
    alert('Update ticket price successfully');
  };

  // ---- Value object context
  const value: ITicketContext = {
    transferTicket,
    listingTicketForSale,
    cancelListingTicket,
    updateTicketPrice,
    buyTicketNFT,
  };

  return (
    <TicketContext.Provider value={value}>
      {props.children}
    </TicketContext.Provider>
  );
};
