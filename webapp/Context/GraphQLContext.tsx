import React from 'react';
import {gql, ApolloClient, InMemoryCache} from '@apollo/client';
import {IEvent} from '../constants/interfaces';
import { now } from 'moment';

interface IGraphQLContext {
  getEvents(): Promise<IEvent[]>;
}

// Create TicketNFTContext
export const GraphQLContext = React.createContext({} as IGraphQLContext);

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_API_URL,
  cache: new InMemoryCache()
});

export const GraphQLProvider = (props: {children: any}) => {
  const getEvents = async (): Promise<IEvent[]> => {
    console.log('Now: ', now());
    
    const query = gql`
      query {
        events(orderBy: endDay, orderDirection: asc, where: {endDay_gt: "${Math.floor(now() / 100)}"}) {
          description
          endDay
          eventManager
          id
          hashImage
          location
          priceUnit
          name
          startDay
        }
      }
    `;
    const data = await client.query({query: query});
    const events: IEvent[] = data.data.events;
    return events;
  };

  // ---- Value object context
  const value: IGraphQLContext = {getEvents};

  return <GraphQLContext.Provider value={value}>{props.children}</GraphQLContext.Provider>;
};
