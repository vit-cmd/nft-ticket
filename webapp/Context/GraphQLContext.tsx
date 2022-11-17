import React from 'react';
import {gql, ApolloClient, InMemoryCache} from '@apollo/client';
import {IEvent} from '../constants/interfaces';
import {now} from 'moment';

interface IGraphQLContext {
  getEvent(id: number): Promise<IEvent>;
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
    const query = gql`
      query {
        events(orderBy: endDay, orderDirection: asc, where: {endDay_gt: "${Math.floor(
          now() / 1000
        )}"}) {
          description
          endDay
          eventManager
          id
          hashImage
          location
          name
          startDay
        }
      }
    `;
    const data = await client.query({query});
    const events: IEvent[] = data.data.events;
    return events;
  };

  const getEvent = async (id: number): Promise<IEvent> => {
    const query = gql`
      query {
        event(id: ${id}) {
          description
          endDay
          eventManager
          hashImage
          id
          location
          startDay
          name
        }
      }
    `;
    const data = await client.query({query});
    const event: IEvent = data.data.event;
    return event;
  };

  // ---- Value object context
  const value: IGraphQLContext = {getEvent, getEvents};

  return <GraphQLContext.Provider value={value}>{props.children}</GraphQLContext.Provider>;
};
