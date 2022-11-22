import React from "react";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import {
  IEvent,
  ITicketType,
  ITicketWithRelation,
} from "../constants/interfaces";
import { now } from "moment";

export interface IGraphQLContext {
  getEvents(): Promise<IEvent[]>;
  getEventWithTicketType(id: number): Promise<IEvent>;
  getTicketTypes(id: number): Promise<ITicketType[]>;
  getTicketDetails(ticketID: string): Promise<ITicketWithRelation>;
}

// Create TicketNFTContext
export const GraphQLContext = React.createContext({} as IGraphQLContext);

const initApollo = {
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_API_URL,
  cache: new InMemoryCache(),
};

export const GraphQLProvider = (props: { children: any }) => {
  const getEvents = async (): Promise<IEvent[]> => {
    const client = new ApolloClient(initApollo);
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
    const data = await client.query({ query: query });
    const events: IEvent[] = data.data.events;
    return events;
  };

  const getEventWithTicketType = async (id: number): Promise<IEvent> => {
    const client = new ApolloClient(initApollo);
    const query = gql`
      query {
        event(id: "${id}") {
          description
          endDay
          eventManager
          hashImage
          id
          location
          startDay
          name
          ticketTypes(where: {eventID: "${id}"}) {
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
    const data = await client.query({ query });
    const event: IEvent = data.data.event;
    return event;
  };

  async function getTicketTypes(id: number): Promise<ITicketType[]> {
    const client = new ApolloClient(initApollo);
    const query = gql`
      query {
        ticketTypes(where: {eventID: "${id}"}) {
          eventID
          hashImage
          id
          maxTicketCount
          name
          priceFactor
        }
      }
    `;
    const data = await client.query({ query });
    const { ticketTypes } = data.data;
    return ticketTypes as ITicketType[];
  }

  const getTicketDetails = async (
    ticketID: string
  ): Promise<ITicketWithRelation> => {
    const client = new ApolloClient(initApollo);
    const query = gql`
      query {
        ticket(id: ${ticketID}) {
          id
          ticketTypeID
          eventID
          ticketType {
            id
            name
            eventID
            description
            hashImage
            currentMintTickets
            maxTicketCount
            priceFactor
            event {
              id
              name
              location
              hashImage
              description
              eventManager
              startDay
              endDay
            }
          }
        }
      }
    `;

    const data = await client.query({ query: query });
    const ticket: ITicketWithRelation = data.data.ticket;
    return ticket;
  };

  // ---- Value object context
  const value: IGraphQLContext = {
    getEventWithTicketType,
    getEvents,
    getTicketTypes,
    getTicketDetails,
  };

  return (
    <GraphQLContext.Provider value={value}>
      {props.children}
    </GraphQLContext.Provider>
  );
};
