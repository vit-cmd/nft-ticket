import {Props} from 'next/script';
import React from 'react';

export interface IConnection {}

export const ConnectionContext = React.createContext<IConnection>({});

export const ConnectionProvider: React.FC<Props> = ({children}) => {
  const value: IConnection = {};

  return <ConnectionContext.Provider value={value}></ConnectionContext.Provider>;
};
