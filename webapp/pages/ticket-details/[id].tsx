import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

//INTERNAL IMPORT
import TicketNFTDetails from '../../components/NFTDetails/NFTDetails';

//IMPORT CONNECTION CONTEXT DATA
import { GraphQLContext } from '../../Context';
import { ITicketWithRelation } from '../../constants/interfaces';

const TicketDetails = () => {
  const router = useRouter();

  const { getTicketDetails } = useContext(GraphQLContext);

  const [ticketData, setTicketData] = useState<ITicketWithRelation>();

  const ticketID =
    router.query!.id === undefined ? `""` : router.query.id!.toString();

  console.log(router.query);

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      const ticket = await getTicketDetails(ticketID);
      setTicketData(ticket);
      console.log('ticket', ticket);
    })();
  }, [router.isReady]);

  return <div>{ticketData && <TicketNFTDetails nft={ticketData} />}</div>;
};

export default TicketDetails;
