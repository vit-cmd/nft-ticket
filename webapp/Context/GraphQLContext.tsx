import React from 'react';
import {gql, ApolloClient, InMemoryCache} from '@apollo/client';
import {IEvent, ITicketType} from '../constants/interfaces';
import {now} from 'moment';

interface IGraphQLContext {
  getEventWithTicketType(id: number): Promise<IEvent>;
  getEvents(): Promise<IEvent[]>;
  getTicketTypes(): Promise<ITicketType[]>;
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
        events(orderBy: endDay, orderDirection: asc, where: {endDay_gt: "${Math.floor(now() / 1000)}"}) {
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

  const getEventWithTicketType = async (id: number): Promise<IEvent> => {
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
          ticketTypes {
            eventID
            hashImage
            name
            priceFactor
            maxTicketCount
            currentMintTickets
            description
            id
          }
        }
      }
    `;
    const data = await client.query({query});
    const event: IEvent = data.data.event;
    return event;
  };

  async function getTicketTypes(): Promise<ITicketType[]> {
    const query = gql`
      query {
        ticketTypes {
          eventID
          hashImage
          id
          maxTicketCount
          name
          priceFactor
        }
      }
    `;
    const data = await client.query({query});
    const {ticketTypes} = data.data;
    return ticketTypes as ITicketType[];
  }

  // ---- Value object context
  const value: IGraphQLContext = {getEventWithTicketType, getEvents, getTicketTypes};

  return <GraphQLContext.Provider value={value}>{props.children}</GraphQLContext.Provider>;
};
