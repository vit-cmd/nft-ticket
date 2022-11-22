import React from "react";
import ethers from "ethers";
import { connectContract } from "./ConnectionContext";
import TicketTypeSol from "../../@artifacts/contracts/TicketType.sol/TicketType.json";
import { TicketType } from "../../@types/contracts/TicketType";

interface ITicketTypeContext {
  createTicketType(
    provider: ethers.providers.Web3Provider,
    eventId: number,
    name: string,
    description: string,
    hashImage: string,
    price: number,
    amount: number
  ): Promise<number>;
}

// Create TicketTypeContext
export const TicketTypeContext = React.createContext({} as ITicketTypeContext);

const ADDRESS_TICKET_TYPE_CONTRACT =
  process.env.NEXT_PUBLIC_TICKET_TYPE_CONTRACT;

export const TicketTypeProvider = (props: { children: any }) => {
  const createTicketType = async (
    provider: ethers.providers.Web3Provider,
    eventId: number,
    name: string,
    description: string,
    hashImage: string,
    price: number,
    amount: number
  ): Promise<number> => {
    const signer = provider.getSigner();
    const contract = connectContract(
      ADDRESS_TICKET_TYPE_CONTRACT!,
      TicketTypeSol.abi,
      signer
    ) as TicketType;

    console.log("price", price);

    try {
      const transaction = await contract.createTicketType(
        eventId,
        name,
        description,
        hashImage,
        amount,
        price
      );
      const rc = await transaction.wait();
      const event = rc.events?.find((event) => event.event === "NewTicketType");
      const [ticketTypeID] = event?.args!;

      return ticketTypeID.toNumber();
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  };

  // ---- Value object context
  const value: ITicketTypeContext = { createTicketType };

  return (
    <TicketTypeContext.Provider value={value}>
      {props.children}
    </TicketTypeContext.Provider>
  );
};
