import React from 'react';
import Image from 'next/image';
import image from '../../img';
import {MdVerified} from 'react-icons/md';
import {BiDetail} from 'react-icons/bi';
import {useRouter} from 'next/router';
import Style from '../../styles/event-details.module.css';
import {GraphQLContext} from '../../Context';
import {isArray} from '@apollo/client/cache/inmemory/helpers';
import {IEvent} from '../../constants/interfaces';
import {Collection} from '../../components';

const EventDetailsWithId = () => {
  const [event, setEvent] = React.useState<IEvent>();
  const [startDay, setStartDay] = React.useState<Date>();
  const [endDay, setEndDay] = React.useState<Date>();
  const {getEvent} = React.useContext(GraphQLContext);
  const router = useRouter();
  const {id} = router.query;

  React.useEffect(() => {
    const getData = async () => {
      if (!id || isArray(id)) {
        return;
      }
      const tempore = await getEvent(parseInt(id));
      setStartDay(new Date(tempore.startDay * 1000));
      setEndDay(new Date(tempore.endDay * 1000));
      setEvent(tempore);
    };
    getData();
  }, [getEvent, id]);

  console.log('Id: ', event);
  if (!event) {
    return;
  } else
    return (
      <div>
        <div className={Style.container_image_event}>
          <Image
            src={`${process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${event.hashImage}`}
            width={500}
            height={500}
            objectFit="cover"
            alt={'Avatar'}
          />
        </div>
        <div className={Style.event_details_box}>
          <h1>
            {event.name}.{' '}
            <span>
              <MdVerified />
            </span>
          </h1>
          <span>
            By: <b>{event.eventManager}</b>
          </span>
          <div className={Style.info_event}>
            <span>
              Start day: <b>{`${startDay!.getMonth()}/${startDay!.getDate()}/${startDay!.getFullYear()}`}</b>
            </span>
            <span>
              End day: <b>{`${endDay!.getMonth()}/${endDay!.getDate()}/${endDay!.getFullYear()}`}</b>
            </span>
            <span>
              Chain: <b>Ethereum</b>
            </span>
          </div>
          <h2>
            <BiDetail /> Description
          </h2>
          <p>{event.description}</p>
          </div>
          <Collection />
      </div>
    );
};

export default EventDetailsWithId;
