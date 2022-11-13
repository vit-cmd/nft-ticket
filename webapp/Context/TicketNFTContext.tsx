import React from 'react';

interface ITicketNFTContext {}

// Create TicketNFTContext
export const TicketNFTContext = React.createContext({} as ITicketNFTContext);

export const TicketNFTProvider = (props: {children: any}) => {
  // ---- Value object context
  const value: ITicketNFTContext = {};

  return <TicketNFTContext.Provider value={value}>{props.children}</TicketNFTContext.Provider>;
};
